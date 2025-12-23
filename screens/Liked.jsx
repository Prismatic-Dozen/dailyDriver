import React, {useContext, useState} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from 'react-native';
import {UserContext} from '../userContext'; // Import the context
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Liked() {
  const {likedImages, removeLikedImage} = useContext(UserContext); // Get likedImages and removeLikedImage from context
  const [selectedImage, setSelectedImage] = useState(null); // State to handle the selected image for modal
  const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

  // Function to open the modal for the clicked image
  const openModal = image => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  // Function to unlike the image (remove from liked images)
  const handleUnlike = () => {
    if (selectedImage) {
      removeLikedImage(selectedImage.id); // Remove image from liked images
      setModalVisible(false); // Close the modal
    }
  };

  // Placeholder function for setting wallpaper
  const handleSetWallpaper = () => {
    // Logic to set the wallpaper goes here
    alert('Wallpaper set successfully!');
    setModalVisible(false); // Close the modal
  };

  return (
    <View style={styles.container}>
      {likedImages.length > 0 ? (
        <View>
          <Text style={styles.likeTitle}>Your liked images</Text>
          <FlatList
            data={likedImages}
            keyExtractor={item => item.id.toString()}
            numColumns={3} // Display 3 images per row
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => openModal(item)}>
                <View style={styles.card}>
                  <Image
                    source={{uri: item.src.portrait}}
                    style={styles.image}
                  />
                </View>
              </TouchableOpacity>
            )}
          />
          {/* Modal for set wallpaper and unlike options */}
          {selectedImage && (
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(false)}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Options</Text>
                <Image
                  source={{uri: selectedImage.src.portrait}}
                  style={styles.modalImage}
                />
                <View style={styles.bButtons}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleSetWallpaper}>
                    <Text style={styles.buttonText}>Set Wallpaper</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleUnlike}>
                    <Text style={styles.buttonText}>Unlike</Text>
                  </TouchableOpacity>
                </View>
                {/* <Button title="Close" onPress={() => setModalVisible(false)} /> */}
                <Ionicons
                  name={'close-outline'}
                  size={30}
                  color={'#9B7EBD'}
                  onPress={() => setModalVisible(false)}
                  style={styles.close}
                />
              </View>
            </Modal>
          )}
        </View>
      ) : (
        <Text style={{color: '#1A1A1D'}}>No liked images yet.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 4,
  },
  card: {
    marginTop: 30,
    margin: 10,
    borderColor: '#9B7EBD',
    elevation: 3,
  },
  likeTitle: {
    fontSize: 18,
    color: '#3B1E54',
    marginLeft: 10,
    marginTop: 30,
    fontWeight: 'bold',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)', // Semi-transparent background
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    color: '#fff',
  },
  modalImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9B7EBD',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    top: 20,
    right: 30,
  },
  bButtons: {
    flexDirection: 'row',
  }
});
