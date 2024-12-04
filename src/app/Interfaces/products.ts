import { HttpClient } from "@angular/common/http";

import { CsvService } from "../Services/csv.service";

export interface Product {
    id: number;
    name: string;
    image: string;
    price: string;
    availableSizes: string[];
    availableTypes: string[];
    availableColors: string[];
  }
  
  export interface ProductCategory {
    title: string;
    products: Product[];
  }
  
  export function updateProductPrices(csvService: CsvService, products: ProductCategory[]) {
    csvService.fetchCsvData('assets/files/ProductPrices.csv').subscribe(
      (csvData) => {
        console.log('Csv Data ', csvData);
        csvData.forEach(({ PRODUCT_NAME, PRODUCT_PRICE }) => {
          products.forEach((category) => {
            category.products.forEach((product) => {
              if (product.name === PRODUCT_NAME) {
                product.price = PRODUCT_PRICE; // Update product price
              }
            });
          });
        });
      },
      (error) => {
        console.error('Error fetching prices:', error);
      }
    );
  } 

  export const products: ProductCategory[] = [
      {
        title: 'Pump Covers',
        products: [
          { 
            id: 1
            ,name: 'Pump Cover Cross Logo'
            ,image: 'assets/images/pump-cover-1.png'
            ,price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 2
            ,name: 'Pump Cover EPH 2:8-9'
            , image: 'assets/images/pump-cover-2.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 3
            ,name: 'Pump Cover EPH 5:15-16'
            , image: 'assets/images/pump-cover-3.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 4
            ,name: 'Pump Cover IS 41:10'
            , image: 'assets/images/pump-cover-4.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 5
            ,name: 'Pump Cover Ps 27:13'
            , image: 'assets/images/pump-cover-5.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 6
            ,name: 'Pump Cover Ps 28:7'
            , image: 'assets/images/pump-cover-6.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 5
            ,name: 'Pump Cover Ps 27:13'
            , image: 'assets/images/pump-cover-5.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 6
            ,name: 'Pump Cover Ps 28:7'
            , image: 'assets/images/pump-cover-6.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 7
            ,name: 'Pump Cover Rom 8:18'
            , image: 'assets/images/pump-cover-7.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL']
            ,availableTypes: ['Normal', 'V-Neck']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          }
        ]
      },
      {
        title: 'Training Shirts & Vests',
        products: [
          { 
            id: 8
            ,name: 'Training Shirts'
            , image: 'assets/images/training-shirt-1.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'White', 'Royal Blue','Black', 'Slate Grey'
            ]
          },
          { 
            id: 9
            ,name: 'Training Vests'
            , image: 'assets/images/training-vest-1.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL',]
            ,availableTypes: ['Standard']
            ,availableColors: [
              'White', 'Grey Melange', 'Black'
            ]
          },
          { 
            id: 10
            ,name: 'Ladies Training Vests'
            , image: 'assets/images/training-vest-ladies-1.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'White', 'Grey Melange', 'Black'
          ]
          },
        ]
      },
      {
        title: 'Joggers & Leggings',
        products: [
          { 
            id:11
            ,name: 'Joggers'
            , image: 'assets/images/joggers.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'Navy Blue', 'Grey Melange', 'Black'
            ]
          },
          { 
            id: 12
            ,name: 'Leggings'
            , image: 'assets/images/leggings.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'Navy Blue', 'Grey Melange', 'Black'
          ]
          }
        ]
      },
      {
        title: 'Hoodies & Sweaters',
        products: [
          { 
            id: 13
            ,name: 'Hoodies'
            , image: 'assets/images/hoodies.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          },
          { 
            id: 14
            ,name: 'Sweaters'
            , image: 'assets/images/sweaters.png'
            , price: ''
            ,availableSizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'White', 'Khaki', 'Pink', 'Yellow', 'Orange',
              'Emerald', 'Bottle Green', 'Red', 'Burgundy', 'Royal Blue',
              'Navy Blue', 'Grey Melange', 'Graphite Melange', 'Charcoal Melange', 'Black'
          ]
          }
        ]
      },
      {
        title: 'Head Wear',
        products: [
          { 
            id: 15
            ,name: 'Fitted Cap'
            , image: 'assets/images/fitted-cap.png'
            , price: ''
            ,availableSizes: ['Standard']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'Black', 'Charcoal Melange', 'Royal Blue'
            ]
          },
          { 
            id: 16
            ,name: 'Signature Snapback Cap'
            , image: 'assets/images/signature-snapback-cap.png'
            , price: ''
            ,availableSizes: ['Standard']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'Denim Blue', 'Grey Melange', 'Graphite Grey'
            ]
          },
          { 
            id: 17
            ,name: 'Skull Beanie'
            , image: 'assets/images/skull-beanie.png'
            , price: ''
            ,availableSizes: ['Standard']
            ,availableTypes: ['Standard']
            ,availableColors: [
              'Black', 'Navy Blue', 'Bottle Green', 'Red'
            ]
          }
        ]
      },
    ];


  