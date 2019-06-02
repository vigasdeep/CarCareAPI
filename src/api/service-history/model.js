import mongoose, { Schema } from 'mongoose'

const serviceHistorySchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  service_type: {
    type: String
  },
  frequency: {
    type: String
  },
  reminder: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

serviceHistorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      service_type: this.service_type,
      frequency: this.frequency,
      reminder: this.reminder,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ServiceHistory', serviceHistorySchema)

export const schema = model.schema
export default model
