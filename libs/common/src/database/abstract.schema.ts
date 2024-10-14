import { Prop, Schema } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema()
export class AbstractDocument {
  @Prop({ _id: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
