import { Schema, model } from 'mongoose';

import mongoosePaginate from 'mongoose-paginate';

const BalanceSchema = new Schema({
  portfolio: {
    EUR: { type: Number },
    USTD: { type: Number },
    BTC: { type: Number }
  },
  assets: [
    {
      _id: { type: Schema.Types.ObjectId },
      name: { type: String, required: true },
      icon: { type: String, required: true },

      key: { type: String, required: true },
      balance: { type: Number },
      cost: { type: Number },
      marketValue: { type: Number },

      priceUnit: { type: Number },
      costUnit: { type: Number },
      marketCap: { type: Number },
      totalCost: { type: Number },
      totalValue: { type: Number },
      gains: { type: Number },
      wallets: [
        {
          exchange: { type: String },
          exchangeKey: { type: String },
          balance: { type: Number }
        }
      ]
    }
  ],
  user: { type: Schema.Types.ObjectId, ref: 'User' },

  delete: { type: Boolean, index: true },
  createDate: { type: Date },
  deleteDate: { type: Date },
  modifiedDate: { type: Date },
  modifiedAdminComment: [{ comment: { type: String }, date: { type: Date } }]
});

BalanceSchema.statics.findMap = async function(
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
        entityResponse.docs.map(balance => {
          return balance;
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


BalanceSchema.plugin(mongoosePaginate);

export const BalanceModel = model('Balance', BalanceSchema);
