import React from 'react';

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.css';
//import 'file-loader?name=[name].[ext]!./full_editor.html';
import 'froala-editor/js/plugins.pkgd.min.js';

import FroalaEditor from 'react-froala-wysiwyg';
import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';

// Render Froala Editor component.
class App extends React.Component {
  constructor() {
    super();

    this.state = {
      content: '<span>My Document\'s Title</span>'
    };

    this.handleModelChange = this.handleModelChange.bind(this);
  }

  handleModelChange(model) {
    console.log("model", model)
    this.setState({
      content: model
    });
  }

  render() {
    const config = {
      // imageUploadURL: 'http://i.froala.com/upload',
      events : {
        'focus' : function(e, editor) {
          console.log("asd")
          // console.log("asdasd",editor.selection.get());
        },
        "image.beforeUpload": function(files) {
          console.log("Ascasnc,asmnc")
          var editor = this;
           if (files.length) {
             // Create a File Reader.
             var reader = new FileReader();
             // Set the reader to insert images when they are loaded.
             reader.onload = function(e) {
               var result = e.target.result;
               editor.image.insert(result, null, null, editor.image.get());
             };
             // Read image as base64.
             reader.readAsDataURL(files[0]);
           }
           editor.popups.hideAll();
           // Stop default upload chain.
           return false;
          }

      }
      //   'imageUploadToS3': {
      //     bucket: 'editor',
      //     // Your bucket region.
      //     region: 's3-us-east-1',
      //     keyStart: 'uploads/',
      //     params: {
      //       acl: 'public-read', // ACL according to Amazon Documentation.
      //       AWSAccessKeyId: 'ACCESS_KEY', // Access Key from Amazon.
      //       policy: 'POLICY_STRING', // Policy string computed in the backend.
      //       signature: '', // Signature computed in the backend.
      
      //       // If you are using Amazon Signature V4, the followings should be used instead.
      //       // "X-Amz-Credential": "...",
      //       // "X-Amz-Algorithm": "AWS4-HMAC-SHA256",
      //       // "X-Amz-Date": "...",
      //       // Policy: "...", //
      //       // "X-Amz-Signature": "", // computed in backend
      //     }
      // }
  }
    return (
      <div className="sample">
        <h2>Full Featured</h2>
        <FroalaEditor
        config={config}
          model={this.state.content}
          onModelChange={this.handleModelChange}

        />
        <h4>Rendered Content:</h4>
        <FroalaEditorView
          model={this.state.content}
        />
      </div>
    );
  }

}

export default App;



