import { useState } from 'react';
import { FlatList } from 'react-native';

import { Product } from '../../types/product';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../ProductModal';
import { Text } from '../Text';

import { ProductContainer, ProductImage, ProductDetails, Separetor, AddToCartButton } from './styles';

interface MenuCart {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({onAddToCart, products}: MenuCart){
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product){
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={()=> setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        style={{marginTop: 32}}
        contentContainerStyle={{paddingHorizontal: 24}}
        showsVerticalScrollIndicator={false}
        keyExtractor={product => product._id}
        ItemSeparatorComponent={Separetor}
        renderItem={({item: product}) => (
          <ProductContainer
            onPress={() => handleOpenModal(product)}
            activeOpacity={0.8}
          >
            <ProductImage
              source={{
                uri: `http://192.168.69.109:3001/uploads/${product.imagePath}`
              }}
            />

            <ProductDetails>
              <Text weight='600'>{product.name}</Text>
              <Text size={14} color='#666' style={{marginVertical: 8}}>
                {product.description}
              </Text>
              <Text size={14} weight='600'>{formatCurrency(product.price)}</Text>
            </ProductDetails>

            <AddToCartButton
              onPress={() => onAddToCart(product)}
              activeOpacity={0.6}
            >
              <PlusCircle/>
            </AddToCartButton>
          </ProductContainer>
        )}
      />
    </>
  );
}

