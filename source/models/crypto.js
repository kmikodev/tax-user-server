import { Schema, model } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate';

const CryptoSchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  key: { type: String, required: true },
  currentPrice:{type:Number},
  lastUpdatedDate: {type:Date},
  pricesHistory:[{
    price:{type:Number},
    updatedDate: {type:Date},
  }],

  delete: { type: Boolean, index: true },
  createDate: { type: Date },
  deleteDate: { type: Date },
  modifiedDate: { type: Date },
  modifiedAdminComment: [{ comment: { type: String }, date: { type: Date } }]
});

CryptoSchema.statics.findMap = async function(
  query,
  populate = [],
  pageNumber = 0,
  pageSize = 20,
  sorts = '',
  includeDeletes
) {
  if (!includeDeletes) {
    if (query['$and']) {
      query['$and'].push({
        delete: { $ne: true }
      });
    } else {
      query = {
        delete: { $ne: true },
        ...query
      };
    }
  }
  const countResult = await this.countDocuments(query);
  pageSize = pageSize || countResult;

  const pageOptions = {
    sort: sorts,
    offset: pageSize * pageNumber,
    limit: pageSize && Number(pageSize) ? Number(pageSize) : countResult + 1,
    populate,
    collation: { locale: 'en', strength: 1 }
  };

  const result = await this.paginate(query, pageOptions).then(
    async entityResponse => {
      const count = countResult;
      const entityDetails = await Promise.all(
        entityResponse.docs.map(crypto => {
          return crypto;
        })
      );
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

  return Promise.resolve(result);
};

CryptoSchema.plugin(mongoosePaginate);

export const CryptoModel = model('Crypto', CryptoSchema);
