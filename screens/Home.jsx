import React, {useEffect, useState, useContext} from 'react';

import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
  NativeModules,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {UserContext} from '../userContext'; // Import the context
console.log(NativeModules);

const API_KEY = 'JZQbwQMsxbmlm63YRnGYxaZgeG0tsEiDOC8oavnxFGcgMRbYf5IjxRET';
const API_URL = 'https://api.pexels.com/v1/curated?per_page=100';

const IMAGE_SIZE = 80;
const SPACEING = 10;

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });

  const {photos} = await data.json();
  return photos;
};

export default function Home() {
  const {likedImages, addLikedImage, removeLikedImage} =
    useContext(UserContext);
  const [images, setImages] = useState(null);
  // const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagesFromPexels();
      setImages(images);
      //   console.log(images);
    };
    fetchImages();
  }, []);

  // Function to toggle like for an individual image
  const toggleLike = image => {
    const isImageLiked = likedImages.some(img => img.id === image.id);

    if (isImageLiked) {
      removeLikedImage(image.id); // Remove the image from liked images
    } else {
      addLikedImage(image); // Add the image to liked images
    }
  };

  const setWallpaper = async (image) => {
    console.log(`Setting wallpaper for image with id: ${image.id}`);
    const imageUrl = image.src.original;
    NativeModules.WallPaperManager.set(imageUrl,callback);
    console.log(imageUrl);
    Alert.prompt('Wallpaper set successfully')
    // NativeModules.WallPaperManager.setWallpaper(image,callback);
    // Add your wallpaper setting logic here
  };

  const topRef = React.useRef();
  const bottomRef = React.useRef();
  const [activeindex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (IMAGE_SIZE + SPACEING) - IMAGE_SIZE / 2 > width / 2) {
      bottomRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACEING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      bottomRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  if (!images) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <FlatList
        ref={topRef}
        data={images}
        keyExtractor={items => items.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev => {
          setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
        }}
        renderItem={({item}) => {
          const isImageLiked = likedImages.some(img => img.id === item.id);
          return (
            <View>
              <Image
                source={{uri: item.src.portrait}}
                style={styles.imageSize}
              />
              <TouchableOpacity
                style={styles.Like}
                onPress={() => toggleLike(item)}>
                <Ionicons
                  name={isImageLiked ? 'heart' : 'heart-outline'}
                  size={30}
                  color={isImageLiked ? 'red' : '#9B7EBD'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.setW}
                onPress={() => setWallpaper(item)}>
                <Text style={styles.title}>Set wallpaper</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <FlatList
        ref={bottomRef}
        data={images}
        keyExtractor={items => items.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{position: 'absolute', bottom: 40}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACEING,
                  marginLeft: SPACEING,
                  borderWidth: 2,
                  borderColor: activeindex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
}

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSize: {
    width: width,
    height: height,
    backgroundColor: '#000',
  },
  setW: {
    backgroundColor: '#9B7EBD',
    width: 200,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 140,
    left: '25%',
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#D4BEE4',
  },
  Like: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 40,
    right: 30,
    borderRadius: 30,
  },
  title: {
    color: '#EEEEEE',
    fontSize: 16,
  },
});
