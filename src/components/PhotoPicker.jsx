import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Pressable } from "react-native";
import * as MediaLibrary from "expo-media-library";

import ModalWindow from "./ModalWindow";

const PhotoPicker = ({ showModal, setPhoto }) => {
  const [response, setResponse] = useState(null);
  const [albums, setAlbums] = useState(null);
  const [searchAlbum, setSearchAlbum] = useState("Camera");

  useEffect(() => {
    (async () => {
      const getPhotos = await MediaLibrary.getAlbumAsync(searchAlbum);
      const getAllAlbums = await MediaLibrary.getAlbumsAsync();

      // setAlbums(filteredAssets);
      setAlbums(getAllAlbums);

      const getAlbumPhotos = await MediaLibrary.getAssetsAsync({
        album: getPhotos,
        first: 100,
        mediaType: "photo",
      });
      setResponse(getAlbumPhotos.assets);
    })();
  }, [searchAlbum]);

  return (
    <>
      {response && (
        <ModalWindow setVisible={showModal}>
          <View style={stylesModal.container}>
            <Text style={stylesModal.title}>{searchAlbum}</Text>
            <ScrollView style={stylesModal.basicScroll} horizontal={true}>
              <View style={stylesModal.upperBar}>
                {albums.map(album => (
                  <TouchableOpacity
                    style={stylesModal.menuItem}
                    key={album.id}
                    onPress={() => {
                      setSearchAlbum(album.title);
                    }}
                  >
                    <Text style={stylesModal.menuText} numberOfLines={1}>
                      {album.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
            <ScrollView style={stylesModal.basicScroll}>
              <View style={stylesModal.gallery}>
                {response.map(item => (
                  <Pressable
                    key={item.id}
                    onPress={async e => {
                      const target = e._dispatchInstances.child.memoizedProps.source.uri;
                      const asset = await MediaLibrary.createAssetAsync(target);
                      setPhoto(asset);
                      showModal();
                    }}
                  >
                    <Image source={{ uri: item.uri }} style={stylesModal.images} />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
        </ModalWindow>
      )}
    </>
  );
};

export default PhotoPicker;

const stylesModal = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  title: { width: "100%", fontSize: 24, fontWeight: 500, textAlign: "center", marginVertical: 10 },
  basicScroll: {
    flex: 1,
  },
  upperBar: { flexDirection: "row", gap: 4, padding: 4 },
  menuItem: {
    backgroundColor: "grey",
    padding: 5,
    borderRadius: 5,
    color: "white",
    width: 75,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  menuText: {
    color: "white",
  },
  gallery: { flexDirection: "row", flexWrap: "wrap", gap: 4, padding: 9 },
  images: { width: 95, height: 95, borderRadius: 10 },
});
