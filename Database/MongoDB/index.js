const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/products', { useNewUrlParser: true, useUnifiedTopology: true });

const productSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  slogan: {
    type: String,
    required: true
  },git
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  default_price: {
    type: String,
    required: true
  },
});

const featureSchema = mongoose.Schema({
  product_id: {
    type: Number,
    unique: true
  },
  features: [
    {
      feature: {
        type: String,
        required: true
      },

      value: {
        type: String,
        required: true
      }
    }
  ],
});

const styleSchema = mongoose.Schema({
  product_id: {
    type: Number,
    unique: true
  },
  results: [
    {
      style_id: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      original_price: {
        type: String,
        required: true
      },
      sale_price: {
        type: String,
        required: true
      },
      default?: {
        type: Boolean,
        required: true
      },
      photos: [
        {
          thumbnail_url: {
            type: String,
            required: true
          },
          url: {
            type: String,
            required: true
          }
        }
      ],
      skus: {
        {
          quantity: {
            type: Number,
            required: true
          },
          size: {
            type: String,
            required: true
          }
        }
      },
    }
  ]
});

const relatedSchema = mongoose.Schema({
  product_id: {
    type: Number,
    unique: true
  },
  relatedIDs: [
    type: Array,
    required: true
  ],
});

const product = mongoose.model('products', productSchema);
const features = mongoose.model('features', featureSchema);
const styles = mongoose.model('styles', styleSchema);
const related = mongoose.model('related', relatedSchema);