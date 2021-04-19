const logger = require('debug-levels')('Gram')
const fs = require('fs');
const path = require('path')

import { model, Schema, Model, Document } from 'mongoose';

import { Note } from './Note'

const GramSchema: Schema = new Schema({
  cname: { type: String }
}, {
  strict: false
})

async function getNotes(cname: string): Promise<string[]> {
  const notes: any[] = await Note.find({ topicCname: cname }).sort({ order: -1 }).lean()
  let docs = []
  for (let note of notes) {
    const doc = `${note.text} _by: ${note.author}_\n`
    docs.push(doc)
  }
  return docs
}

async function getExamples(cname: string): Promise<string[]> {
  return []
}

async function getComments(cname: string): Promise<string[]> {
  return []
  // return ('TODO - comments: ' + cname)
}

function listOf(items: any[], heading: string) {
  if (items && items.length) {
    return `# ${heading}\n- ${items.join('\n- ')}`
  } else {
    return `# ${heading}\nnone`
  }
}

function makeTitle(item: any): string {
  let title
  if (item.lang == 'ja') {
    title = `${item.ja} / ${item.hg} / ${item.rm}`
  } else {
    // chinese
    title = `${item.zh} / ${item.pn} / ${item.en}`
  }
  return title
}

function getTags(item: any): string[] {
  const tags = item.tags?.filter((tag: string) => tag != item.cname)
  return tags
}

function getRelated(item: any): string[] {
  // return this as a [[hot-links]] list
  let links = []
  if (!item.related) return []
  for (let rel of item.related) {
    links.push(`[[${rel}]]`)
  }
  return links
}

GramSchema.statics.toMarkdown = async function () {
  console.log('toMarkdown')
  logger.log('toMarkdown')

  // const all = await Gram.find({})

  const items: any[] = await Gram.find({}).limit(0).lean()
  logger.log('gram count', items.length)

  for (const item of items) {

    // items.forEach((item: any) => {
    logger.info(item)

    const title = makeTitle(item)
    const tags = getTags(item)
    const related = getRelated(item)

    const examples = await getExamples(item.cname)
    const notes = await getNotes(item.cname)
    const comments = await getComments(item.cname)

    // const examples = item.keyex.map(line => {
    //   return line
    // })

    logger.info('title', title, item.zh)
    logger.info('keys', Object.keys(item))
    const md = `---
cname: ${item.cname}
type: gram

tags:
- ${item.lang}
- ${tags?.join('\n- ')}
- gram

related:
- ${item.related?.join('\n- ')}

lang: ${item.lang}
level: ${item.level}
regex: ${item.rex}
group: ${item.concept}

ja: ${item.ja}
hg: ${item.hg}
rm: ${item.rm}

zh: ${item.zh}
pn: ${item.pn}

en: ${item.en}

---
# ${title}
${item.en}

## short
${item.brief}

## structure
${item.structure}

## explanation
${item.explanation}

${listOf(examples, 'examples')}

${listOf(notes, 'notes')}

${listOf(comments, 'comments')}

${listOf(related, 'related')}

`

    logger.info(md)
    const fp = path.join(__dirname, `../../data/gramap.wiki/${item.cname}.md`)
    fs.writeFileSync(fp, md)
  }

}

interface IGramDoc extends Document {
  cname: string;
  // instance methods declared here
}

interface IGramModel extends Model<IGramDoc> {
  // static methods here
  toMarkdown: () => string
}


const Gram: IGramModel = model<IGramDoc, IGramModel>('grams', GramSchema)


export { Gram, IGramDoc as IGram }
