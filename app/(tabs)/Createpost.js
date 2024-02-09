import { useState } from "react";
import { Text, View, TextInput, Button, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Createpost = () => {
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    tags: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (_key, _value) => {
    setBlog((prev) => ({
      ...prev,
      [_key]: _key === "tags" ? _value.split(',').filter(Boolean).join(',') : _value,
    }));
  };

  const handleCreatePost = async () => {
    console.log(blog);
  };

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.container}
      extraScrollHeight={Platform.select({ ios: 50, android: 0 })}
    >
      <View>
        <Text style={styles.header}>Create Blog Post</Text>
        <TextInput
          style={styles.input}
          placeholder="Title"
          value={blog.title}
          onChangeText={(text) => handleChange('title', text)}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Content"
          multiline
          value={blog.content}
          onChangeText={(text) => handleChange('content', text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Tags (comma-separated)"
          value={blog.tags}
          onChangeText={(text) => handleChange('tags', text)}
        />
        <Button title="Create Post" onPress={handleCreatePost} />
        {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  multilineInput: {
    height: 300,
    textAlignVertical: 'top',
  },
  errorMessage: {
    color: "red",
    marginBottom: 16,
  },
});

export default Createpost;



// import { useState } from "react";
// import { Text, View, TextInput, Button, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";

// const Createpost = () => {
//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     tags: "",
//   });

//   const [errorMessage, setErrorMessage] = useState("");

//   const handleChange = (_key, _value) => {
//     setBlog((prev) => ({
//       ...prev,
//       [_key]: _key === "tags" ? _value.split(',').filter(Boolean).join(',') : _value,
//     }));
//   };

//   const handleCreatePost = async () => {
//     console.log(blog);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//       style={{ flex: 1 }}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.container}>
//           <Text style={styles.header}>Create Blog Post</Text>
//           <TextInput
//             style={styles.input}
//             placeholder="Title"
//             value={blog.title}
//             onChangeText={(text) => handleChange('title', text)}
//           />
//           <TextInput
//             style={[styles.input, styles.multilineInput]}
//             placeholder="Content"
//             multiline
//             value={blog.content}
//             onChangeText={(text) => handleChange('content', text)}
//           />

//           <TextInput
//             style={styles.input}
//             placeholder="Tags (comma-separated)"
//             value={blog.tags}
//             onChangeText={(text) => handleChange('tags', text)}
//           />
//           <Button title="Create Post" onPress={handleCreatePost} />
//           {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   scrollContainer: {
//     flexGrow: 1,
//   },
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: "gray",
//     borderWidth: 1,
//     marginBottom: 16,
//     paddingHorizontal: 8,
//   },
//   multilineInput: {
//     height: 300,
//     textAlignVertical: 'top',
//   },
//   errorMessage: {
//     color: "red",
//     marginBottom: 16,
//   },
// });

// export default Createpost;
