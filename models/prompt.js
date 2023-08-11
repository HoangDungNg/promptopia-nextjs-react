import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
  creator: {
    // this will points to the User Schema
    type: Schema.Types.ObjectId,
    ref: 'User', // one to many relationship. So we will put User as reference
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
