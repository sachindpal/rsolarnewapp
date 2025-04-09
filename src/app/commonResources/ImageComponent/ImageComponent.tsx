import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'

// const ImageComponent = ({ source, imgWidth, imgHeight, styleProvided, activityWitdh, activityHeight, style }: any) => {

//   const [loading, setLoading] = useState(true);

//   const loadingState=()=>{
//     setLoading(false)
//   }

//   return (
//     <View >
//       {!styleProvided ?
//         <>
//           {loading ? <View style={{ alignItems: "center", justifyContent: "center", width: 0.1 * imgWidth, height: 0.50 * imgHeight }}><ActivityIndicator size="small" color="#0000ff" /></View> : null}
//           <Image
//             source={source}
//             width={imgWidth}
//             height={imgHeight}
//             onLoadEnd={loadingState}
//           />
//         </> :
//         <>
//           {loading ? <View style={{ alignItems: "center", justifyContent: "center", width: 0.1 * activityWitdh, height: 0.50 * activityHeight }}><ActivityIndicator size="small" color="#0000ff" /></View> : null}
//           <Image
//             source={source}
//             style={style}
//             onLoadEnd={loadingState}
//           />
//         </>}

//     </View>
//   )
// }

// export default ImageComponent

const ImageLoading = ({ source, style }:any) => {
  // State to track loading status
  const [isLoading, setIsLoading] = React.useState(true);

  // Function to handle image loading
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={[styles.image, !isLoading && styles.imageLoaded]}
        onLoad={handleImageLoad}
      />
      {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
    </View>
  );
};

export default React.memo(ImageLoading);  


const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: 'white', // Placeholder background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0, // Initially hide the image
  },
  imageLoaded: {
    opacity: 1, // Show the image once loaded
  },
  loadingIndicator: {
    position: 'absolute',
  },
});