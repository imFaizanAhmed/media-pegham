import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
// embedding model
import { OpenAIEmbeddings } from "@langchain/openai";
// to ingest documents
import { MemoryVectorStore } from "langchain/vectorstores/memory";
// to create Document chain
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import * as zod from "zod";
import { postFormSchema } from "@/components/post-questionnaire/validation";
class PostGenerator {
  static instance: PostGenerator;

  #chain: any;
  //RunnableSequence<any, BaseMessageChunk>

  constructor() {
    // prompt for the document chain
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a world class digital content writer.
        
        When I ask for help to write something, you will reply with a where each paragraph contains at least one joke or playful comment.`,
      ],
      [
        "user",
        `Write a social media post for {socialMedia}. Start your response with small but eye catchy summary and then explain the topic in detail.

      topic: {topic}`,
      ],
    ]);

    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });
    const outputParser = new StringOutputParser();

    this.#chain = prompt.pipe(chatModel).pipe(outputParser);
  }

  async generatePostFromDocs() {
    const chatModel = new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const loader = new CheerioWebBaseLoader(
      "https://docs.smith.langchain.com/overview"
    );

    const docs = await loader.load();
    const splitter = new RecursiveCharacterTextSplitter();

    const splitDocs = await splitter.splitDocuments(docs);

    console.log(splitDocs.length);
    console.log(splitDocs[0].pageContent.length);

    // initializing embedding vector
    const embeddings = new OpenAIEmbeddings();

    // ingesting document to embedding vector
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings
    );

    // prompt for the document chain
    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a world class digital content writer.
        
        When I ask for help to write something, you will reply with a where each paragraph contains at least one joke or playful comment.`,
      ],
      [
        "user",
        `Write a social media post for {socialMedia}. Start your response with small but eye catchy summary and then explain the topic in detail.

      topic: {topic}`,
      ],
    ]);

    // creating document chain
    const documentChain = await createStuffDocumentsChain({
      llm: chatModel,
      prompt,
    });

    // retriever to dynamically select the most relevant documents
    const retriever = vectorstore.asRetriever();

    const retrievalChain = await createRetrievalChain({
      combineDocsChain: documentChain,
      retriever,
    });

    const result = await retrievalChain.invoke({
      input: "what is LangSmith?",
    });

    // console.log(result.answer);
    return result.answer;
  }

  async generatePost({
    referenceLinks,
    socialMediaPlateform,
    description,
    vibe,
  }: zod.infer<typeof postFormSchema>) {
    const resp = await this.#chain.invoke({
      socialMedia: socialMediaPlateform,
      topic: description
    });

    console.log("resp", resp);
    return resp;
  }
}

export const postGenerator = new PostGenerator();
