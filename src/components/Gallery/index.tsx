import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useParams } from "react-router";
import HamburgerNav, { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import ImageCard from "../ImageCard";
import "./gallery.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import ImageInspector from "../ImageInspector";
import galleriesAction from "../../actions/galleriesAction";
import { Link, useRouteMatch } from "react-router-dom";
import UploadImagePage from "./UploadImagePage";
import imagesAction from "../../actions/imagesAction";
import Gallery from "../../model/gallery/gallery";
import CreateGalleryPage from "./CreateGalleryPage";

interface GalleryParams {
  id: string
}

const GalleryPage = () => {
  const {id} = useParams<GalleryParams>();
  const [gallery, setGallery] = useState<Gallery>({
    id: '',
    logo: '',
    title: '',
    description: '',
    createDate: '',
    submissionOpenDate: new Date(0).toISOString(),
    submissionCloseDate: new Date(0).toISOString(),
    submissionCount: 0
  });

  const dispatch = useAppDispatch();
  const galleriesMap = useAppSelector(state => state.galleriesMap);
  const gallerySubmissions = useAppSelector(state => state.imagesByGallery);
  const submissions = () => gallerySubmissions[id];
  const adminStatus = useAppSelector(state => state.adminStatus);

  const path = useRouteMatch();
  const history = useHistory();

  useEffect(() => {
    if (!!galleriesMap[id]) {
      setGallery(galleriesMap[id]);
    }
    else 
      galleriesAction.getGallery(dispatch, id)
        .catch(() => history.replace(`/browse-jams`));

    imagesAction.getImagesByGallery(dispatch, id);
    
  }, [id, dispatch, galleriesMap, history]);

  const submissionsClosed = () => Date.now() > Date.parse(gallery.submissionCloseDate);
  const submissionsOpen = () => Date.now() >= Date.parse(gallery.submissionOpenDate) && !submissionsClosed();
  
  return (
    <Switch>
      <Route path={`${path.url}/upload`} exact={true}>
        { !!gallery.id &&
          <UploadImagePage gallery={gallery}/>
        }
      </Route>
      <Route path={`${path.url}/edit`} exact={true}>
        { !!gallery.id &&
          <CreateGalleryPage gallery={gallery}/>
        }
      </Route>
      <Route path={`${path.url}/:imageId`} exact={true}>
        { !!gallery.id &&
          <ImageInspector gallery={gallery} submissions={submissions()}/>
        }
      </Route>
      <Route path={path.url}>
        { !!gallery.id &&
          <div className="primary container-fluid g-0 min-vh-100">
            <div className="position-relative g-0 vh-100 d-md-flex d-none">
              <div className="h-100 overflow-scroll p-3 col-lg-3 col-md-4">
                <img src={gallery.logo} alt="jam logo"
                  className="rounded w-100" />
                <h1>{gallery.title}</h1>
                <p>{gallery.description}</p>
                
                <p>
                  <span className="fw-bold">Start Date: </span>{new Date(gallery.submissionOpenDate).toLocaleDateString()}
                  <br />
                  <span className="fw-bold">End Date: </span>{new Date(gallery.submissionCloseDate).toLocaleDateString()}
                </p>
                { (submissionsOpen() || submissionsClosed()) &&
                  <p>
                    <span className="fw-bold">Submissions: </span>{gallery.submissionCount}
                  </p>
                }
                { submissionsOpen() &&
                  <>
                    <p className="mb-1">Submissions are open for this jam!</p>
                    <Link to={`/jam/${gallery.id}/upload`} className="btn btn-secondary py-3 px-5">Submit Art</Link>
                  </>
                }
                { adminStatus &&
                    <Link to={`/jam/${gallery.id}/edit`} className="btn btn-secondary py-3 px-5">Edit Jam</Link>
                }
              </div>
              <div className="secondary flex-grow-1 position-relative">
                <div className="position-absolute p-2 end-0 top-0 z-10">
                  <HamburgerNav displayClass="primary" active={submissionsOpen() ? HamburgerNavOptions.activeJam:HamburgerNavOptions.none}/>
                </div>
                <div className="position-absolute top-50 translate-middle-y card col-11 main-card d-flex flex-row">
                  <div className="flex-grow-1 container-fluid p-3">
                    <div className="row row-cols-lg-4 row-cols-md-3 g-3">
                      { !!gallery.id && 
                        submissions()?.map(image => 
                          <div key={image.id} className="col">
                            <ImageCard image={image} gallery={gallery}/>
                          </div>)
                      }
                    </div>
                  </div>
                  <div className="d-flex flex-column justify-content-between text-primary border-start">
                    <button className="btn btn-link link-primary">
                      <i className="fas fa-fw fa-2x fa-chevron-up"></i>
                    </button>
                    <div className="px-3 pt-1">
                      <i className="fas fa-fw fa-2x fa-ellipsis-v"></i>
                    </div>
                    <button className="btn btn-link link-primary">
                      <i className="fas fa-fw fa-2x fa-chevron-down"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex flex-column d-md-none d-block vh-100">
              <div className="position-relative p-3">
                <div className="position-relative d-flex title-bar">
                  <div className="position-relative logo-container flex-shrink-1">
                    <img src={gallery.logo} alt="jam logo"
                      className="rounded" />
                  </div>
                  <div className="position-relative flex-grow-1">
                    <h1 className="position-absolute bottom-0 ps-3">{gallery.title}</h1>
                  </div>
                  <div className="position-relative">
                    <HamburgerNav active={submissionsOpen() ? HamburgerNavOptions.activeJam:HamburgerNavOptions.none}/>
                  </div>
                </div>
                
                <p className="pt-1">{gallery.description}</p>
                <div className="d-flex">
                  <p className="mb-0 flex-grow-1">
                    <span className="fw-bold">Start Date: </span>{new Date(gallery.submissionOpenDate).toLocaleDateString()}
                    <br />
                    <span className="fw-bold">End Date: </span>{new Date(gallery.submissionCloseDate).toLocaleDateString()}
                  </p>
                  { submissionsOpen() &&
                    <Link to={`/jam/${gallery.id}/upload`} className="btn btn-secondary py-auto px-5">Submit Art</Link>
                  }
                </div>
              </div>
              <div className="white d-flex flex-column justify-content-between flex-grow-1 position-relative">
                <div className="container-fluid overflow-scroll">
                  <div className="row row-cols-sm-3 row-cols-2 p-3 g-2 mx-0 ">
                    { submissionsOpen() &&
                      <button className="card col-6 text-center position-relative">
                        <div className="position-absolute top-50 start-50 translate-middle">
                          <i className="fas fa-upload"></i>
                          <br />
                          Upload Submission
                        </div>
                      </button>
                    }
                    {
                      submissions()?.map(image => 
                        <div key={image.id} className="col">
                          <ImageCard image={image} gallery={gallery}/>
                        </div>)
                    }
                  </div>
                </div>
                <div className="d-flex justify-content-between text-primary border-top fa-2x">
                    <button className="btn btn-link link-primary">
                      <i className="fas fa-fw fa-2x fa-chevron-left"></i>
                    </button>
                    <div className="pt-2 pb-3">
                      <i className="fas fa-fw fa-ellipsis-h"></i>
                    </div>
                    <button className="btn btn-link link-primary">
                      <i className="fas fa-fw fa-2x fa-chevron-right"></i>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        }
      </Route>
    </Switch>
  );
};

export default GalleryPage;