import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import galleriesAction from "../../actions/galleriesAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Gallery from "../../model/gallery/gallery";
import authService from "../../service/authService";
import { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import WebsiteHeader from "../WebsiteHeader";

interface EditGalleryProps {
  gallery?: Gallery;
}

const CreateGalleryPage = ({gallery}: EditGalleryProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [edit, setEdit] = useState<Gallery>({
    id: '',
    logo: '',
    title: '',
    description: '',
    createDate: '',
    submissionOpenDate: '',
    submissionCloseDate: '',
    submissionCount: 0
  });

  const adminStatus = useAppSelector(state => state.adminStatus);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!adminStatus) 
      authService.auth()
        .then(auth => {
          if (!auth || !auth.admin) history.push('/login');
          else if (!!gallery) {
            setIsEdit(true);
            setEdit(gallery);
          }
        });
    else if (!!gallery) {
      setIsEdit(true);
      setEdit(gallery);
    }
  }, [adminStatus, gallery, history]);

  const formatDateString = (date: string, endOfDay = false) => 
    date + (endOfDay ? 'T23:59:59':'T00:00:00');

  const handleSave = () => {
    if (!isEdit) {
      /* Camelcase code from https://stackoverflow.com/questions/2970525/converting-any-string-into-camel-case */
      edit.id = edit.title.replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => 
        index === 0 ? word.toLowerCase() : word.toUpperCase())
          .replace(/\s+/g, '');

      edit.createDate = new Date().toISOString();
    }

    (isEdit ? galleriesAction.updateGallery : galleriesAction.postGallery)(dispatch, edit)
      .then(() => history.push(`/jam/${edit.id}`))
      .catch(console.warn)
  };

  return (
    <div className="primary container-fluid g-0 min-vh-100 p-3">
      <WebsiteHeader pushContent={true} activeLink={HamburgerNavOptions.none} />
      <div className="container">
        <div className="card">
          <div className="card-header">
            { isEdit ?
              <h5 className="card-title">
                Editing {gallery?.title}
              </h5> 
              :
              <h5 className="card-title">
                Create a New Jam
              </h5>
            }
          </div>
          <div className="card-body">
            <form>
              <label className="form-label" htmlFor="galleryLogo">Image URL:</label>
              <input className="form-control mb-3" type="url" name="galleryLogo" id="galleryLogo"
                placeholder="https://www.website.com/.../someimage.png"
                defaultValue={gallery?.logo}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEdit({...edit, logo: event.target.value})}/>

              { !!edit.logo &&
                <div className="imagePreview mb-3">
                  Image Preview:<br/>
                  <img src={edit.logo} alt="preview" height="200"/>
                </div>
              }

              <label className="form-label" htmlFor="galleryTitle">Title:</label>
              <input className="form-control mb-3" type="text" name="galleryTitle" id="galleryTitle"
                placeholder="Jam"
                defaultValue={gallery?.title}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEdit({...edit, title: event.target.value})}/>

              <label className="form-label" htmlFor="galleryDescription">Description:</label>
              <textarea className="form-control mb-3" name="galleryDescription" id="galleryDescription"
                placeholder="Details about the jam..."
                defaultValue={gallery?.description}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) => setEdit({...edit, description: event.target.value})}/>

              <label className="form-label" htmlFor="galleryStartDate">Submissions Open Date:</label>
              <input className="form-control mb-3" type="date" name="galleryStartDate" id="galleryStartDate"
                defaultValue={gallery?.submissionOpenDate.substring(0, 10)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEdit({...edit, submissionOpenDate: formatDateString(event.target.value)})}/>
                
              <label className="form-label" htmlFor="galleryEndDate">Submissions Close Date:</label>
              <input className="form-control mb-3" type="date" name="galleryEndDate" id="galleryEndDate"
                defaultValue={gallery?.submissionCloseDate.substring(0, 10)}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setEdit({...edit, submissionCloseDate: formatDateString(event.target.value, true)})}/> 
              
            </form>
          </div>
          <div className="card-footer">
            <Link to={`/browse-jams`} type="button" className="btn btn-secondary">Cancel</Link>
            <button type="button" className="btn btn-primary"
              onClick={handleSave}>{isEdit ? 'Save':'Create'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateGalleryPage;