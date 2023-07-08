            {hasPermission ? (
              !photo && (
                <View style={styles.photoBar}>
                  <Camera style={styles.camera} type={type} ref={setCameraRef}>
                    <TouchableOpacity
                      style={[styles.PhotoButton, styles.light]}
                      onPress={async () => {
                        if (cameraRef) {
                          const { uri } = await cameraRef.takePictureAsync();
                          const asset = await MediaLibrary.createAssetAsync(uri);
                          setPhoto(asset);
                        }
                      }}
                    >
                      <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                    </TouchableOpacity>
                  </Camera>
                </View>
              )
            ) : (
              <View style={styles.photoBar}>
                <View style={styles.PhotoButton}>
                  <Ionicons name="md-camera-sharp" size={24} style={styles.photoIcon} />
                </View>
              </View>
            )}

{
    photo && (
        <View style={styles.photoBar}>
            <Image source={photo} style={styles.photo} /></View>)
}