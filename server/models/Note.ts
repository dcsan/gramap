const logger = require('debug-levels')('Note')
const fs = require('fs');
const path = require('path')

import { model, Schema, Model, Document } from 'mongoose';

const NoteSchema: Schema = new Schema({
  cname: { type: String }
}, {
  strict: false
})


NoteSchema.statics.toMarkdown = async function () {

}

interface INoteDoc extends Document {
  cname: string;
  // instance methods declared here
}

interface INoteModel extends Model<INoteDoc> {
  // static methods here
  toMarkdown: () => string
}


const Note: INoteModel = model<INoteDoc, INoteModel>('notes', NoteSchema)


export { Note, INoteDoc as INote }
