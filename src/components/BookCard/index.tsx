import React, {FC, SyntheticEvent} from 'react';
import {Text, Card, CardItem, Body} from 'native-base';
import {Image, Pressable, StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type ItemType = {
  title: string;
  author: string;
  cover: string;
  price: string;
};

interface BookCardProps {
  item: ItemType;
  isAuthenticated: boolean;
}

const BookCard: FC<BookCardProps> = ({item, isAuthenticated}) => {
  const {title, author, cover, price} = item;

  const handlePress = (e: SyntheticEvent) => {
    console.log('card press e:', e);
  };

  const handleLikePress = (e: SyntheticEvent) => {
    console.log('like press e: ', e);
  };

  return (
    <Card onTouchEnd={(e) => handlePress(e)}>
      <CardItem>
        <Body style={styles.container}>
          <Image
            style={styles.cover}
            source={
              cover
                ? {uri: `http://localhost:5000${cover}`}
                : require('../../assets/img/book-cover.png')
            }
          />
          <View style={styles.info}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{author}</Text>
          </View>
        </Body>
      </CardItem>
      <CardItem footer style={styles.footer}>
        <Text>{price} $</Text>
        {isAuthenticated ? (
          <Pressable style={styles.like} onPress={handleLikePress}>
            <Ionicons name={'heart'} size={20} color={'tomato'} />
          </Pressable>
        ) : null}
      </CardItem>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cover: {
    marginRight: 10,
    width: 100,
    height: 100,
  },
  info: {
    width: 0,
    flexGrow: 1,
  },
  title: {
    marginBottom: 5,
    fontSize: 18,
    fontWeight: '700',
  },
  author: {
    fontSize: 14,
    color: 'gray',
  },
  footer: {
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  like: {
    width: 20,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingTop: 0,
    paddingBottom: 0,
    zIndex: 100,
  },
});

export default BookCard;
