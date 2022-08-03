import { useDropzone } from "react-dropzone";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

export const AddFile = ({ data, setData }) => {
  const [message, setMessage] = useState("Drag 'n' drop some files here, or click to select files");

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setMessage(file.name);
    const reader = new FileReader();
    reader.onload = async (event) => {
      const lines = await event.target.result;
      setData({
        ...data,
        fileContent: lines,
      });
    };
    reader.readAsText(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".txt"],
    },
    multiple: false,
  });
  return (
    <Box
      my={8}
      border="dashed 1px"
      borderRadius={5}
      textAlign="center"
      borderColor={useColorModeValue("purple.400", "purple.100")}
      cursor="pointer"
    >
      <section
        style={{
          height: "4.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>{message}</p>
        </div>
      </section>
    </Box>
  );
};
