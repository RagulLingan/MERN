import { useState } from "react";
import FileUpload from "react-material-file-upload";


export default function DropZone(props) {
  const { selectedFiles,buttonText } = props;
  const [files, setFiles] = useState([]);

  const onChange = (files) => {
    setFiles(files);
    selectedFiles(files);
  };

  return <FileUpload value={files} accept="image/png, image/gif, image/jpeg"  onChange={onChange} buttonText={buttonText}/>;
}
