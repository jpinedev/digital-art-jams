import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import imagesAction from "../../actions/imagesAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Gallery from "../../model/gallery/gallery";
import authService from "../../service/authService";
import { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import WebsiteHeader from "../WebsiteHeader";

interface UploadImageProps {
  gallery: Gallery
}
const UploadImagePage = ({gallery}: UploadImageProps) => {
  const authStatus = useAppSelector(state => state.authStatus);
  const authUser = useAppSelector(state => state.authUser);
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [imagePreview, setImagePreview] = useState<string>();

  const [title, setTitle] = useState<string>('');

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length || event.target.files?.length === 0) {
      setImageFile(undefined);
      setImagePreview(undefined);
      return;
    }

    const file = event.target.files.item(0) as File | undefined;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }

  const handleSubmission = () => {
    if (!imageFile) return;

    imagesAction.postImageToGallery(dispatch, gallery.id, authUser.username, title, imageFile)
      .then(({id}) => history.push(`/jam/${gallery.id}/${id}`))
      .catch((_err: any) => alert(`There was a problem uploading your submission.\nHave you already made a submission for this Jam?`));
  }


  useEffect(() => {
    if (!authStatus) 
      authService.auth()
        .then(auth => {
          if (!auth) history.push('/login')
        });

    const submissionsClosed = () => Date.now() > Date.parse(gallery.submissionCloseDate);
    const submissionsOpen = () => Date.now() >= Date.parse(gallery.submissionOpenDate) && !submissionsClosed();
    if (!submissionsOpen() || submissionsClosed()) history.replace(`/browse-jams`);

  }, [authStatus, history, gallery]);

  return (
    <div className="primary container-fluid g-0 min-vh-100 p-3">
      <WebsiteHeader pushContent={true} activeLink={HamburgerNavOptions.none} />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Upload Submission for {gallery.title}</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">{gallery.description}</div>
            <hr />
            <form>
              <input className="form-control" type="file" name="uploadImg" id="uploadImg"
                accept=".jpg,.jpeg,.png,.gif,.tiff"
                onChange={handleFileUpload}/><br/>
                
              { !!imagePreview &&
                <div className="imagePreview mb-3">
                  Image Preview:<br/>
                  <img src={imagePreview} alt="preview" height="200"/>
                </div>
              }

              <label className="form-label" htmlFor="imageTitle">Title:</label>
              <input className="form-control" type="text" name="imageTitle" id="imageTitle"
                placeholder="(Untitled)"
                onChange={handleTitleChange}/>
            </form>
          </div>
          <div className="card-footer">
            <Link to={`/jam/${gallery.id}`} type="button" className="btn btn-secondary">Cancel</Link>
            <button type="button" className="btn btn-primary"
              onClick={handleSubmission}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UploadImagePage;