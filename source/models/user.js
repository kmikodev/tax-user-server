import { Schema, model } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate';

export const UserSchema = new Schema({  
  delete: { type: Boolean, index: true },
  deleteDate: { type: Date },
  createDate: { type: Date, index: true },
  modifiedDate: { type: Date },  

  username: { type: String, trim: true },
  name: { type: String, trim: true },
  lastname_1: { type: String, trim: true },
  lastname_2: { type: String, trim: true },
  status: { type: String },
  remoteAddress: { type: String },
  largeFamilyStatus: { type: String },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    sparse: true
  },
  confirm: { type: Boolean },
  confirmCode: { type: String },
  confirmDate: { type: Date },

  defaultLanguage: { type: String },
  password: { type: String },
  document : { type: String, trim: true, uppercase: true },
  birthdate : { type: Date },
  imagesPolicyAccepted : { type: Boolean },
  phone : { type: String },
  photo : Schema.Types.Mixed,
  zip : { type: String },
  township : { type: String },
  province : { type: String },
  address : { type: String },
  recoverPasswordDate : { type: Date},
  recoverPasswordCode: {type:String}

});

UserSchema.statics.findMap = async function(
  query,
  select = 'name lastname_1 lastname_2 status largeFamilyStatus email document birthdate imagesPolicyAccepted phone photo zip township province address',
  populate = [],
  pageNumber = 0,
  pageSize = 20,
  sorts = ''
) {
 
  
  const countResult = await this.countDocuments(query);
  pageSize = pageSize || countResult;

  const pageOptions = {
    sort: sorts,
    offset: pageSize * pageNumber,
    limit: pageSize && Number(pageSize) ? Number(pageSize) : countResult + 1,
    populate,
    collation: { locale: 'en', strength: 1 }
  };

  const result = this.paginate(query, pageOptions).then(
    async entityResponse => {
      const count = countResult;
      const entityDetails = entityResponse.docs;

      const entityResponsePage = {
        page: {
          totalElements: count,
          totalPages: count ? Math.ceil(count / pageSize) : 0,
          pageRequest: {
            pageNumber: entityResponse.offset / pageSize,
            size: entityResponse.limit,
            sorts
          }
        },
        content: entityDetails
      };

      return entityResponsePage;
    }
  );

  result
};

UserSchema.plugin(mongoosePaginate);

export const UserModel = model('User', UserSchema);
