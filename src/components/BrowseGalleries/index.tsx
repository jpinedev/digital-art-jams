import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import galleriesAction from "../../actions/galleriesAction";
import { useAppDispatch, useAppSelector } from "../../hooks";
import Gallery from "../../model/gallery/gallery";
import { HamburgerNavOptions } from "../Navigation/HamburgerNav";
import WebsiteHeader from "../WebsiteHeader";
import "./browseGalleries.css";
import useQuery from "./Queries";

type GalleryCompareFn = (a: Gallery, b: Gallery) => number;
const sortFns: {[key: string]: {[key: string]: GalleryCompareFn}} = {
  sortByTitle: {
    ASC: (a: Gallery, b: Gallery) => a?.title.localeCompare(b?.title),
    DSC: (a: Gallery, b: Gallery) => b?.title.localeCompare(a?.title)
  },
  sortBySubmissions: {
    ASC: (a: Gallery, b: Gallery) => a.submissionCount - b.submissionCount,
    DSC: (a: Gallery, b: Gallery) => b.submissionCount - a.submissionCount
  },
  sortByDate: {
    ASC: (a: Gallery, b: Gallery) => Date.parse(a?.submissionCloseDate) - Date.parse(b?.submissionCloseDate),
    DSC: (a: Gallery, b: Gallery) => Date.parse(b?.submissionCloseDate) - Date.parse(a?.submissionCloseDate)
  }
}

type SortBy = {
  key: string,
  [key: string]: string
}

const BrowseGalleries = () => {
  const [sortBy, setSortBy] = useState<SortBy>({
    key: 'sortByDate',
    sortByTitle: 'ASC',
    sortBySubmissions: 'DSC',
    sortByDate: 'DSC'
  });
  const setSortByProperty = (prop: string) => {
    if(sortBy.key === prop)
      setSortBy({...sortBy, [prop]: (sortBy[prop] === 'ASC' ? 'DSC':'ASC')});
    else setSortBy({...sortBy, key: prop});
  }
  const setSortByTitle = () => setSortByProperty('sortByTitle');
  const setSortBySubmissions = () => setSortByProperty('sortBySubmissions');
  const setSortByDate = () => setSortByProperty('sortByDate');

  const adminStatus = useAppSelector(state => state.adminStatus);
  const activeJam = useAppSelector(state => state.activeJam);
  const galleries = useAppSelector(state => state.galleriesMap);
  const [filter, setFilter] = useState('');

  const dispatch = useAppDispatch();
  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const query = useQuery();
  const history = useHistory();

  const [keywords, setKeywords] = useState('');
  const updateKeywords = (event: ChangeEvent<HTMLInputElement>) => {
    setKeywords(event.target.value);
  };
  const handleSearch = () => {
    if (!keywords) history.push('/browse-jams');
    else history.push(`/browse-jams?keywords=${keywords}`);
  };

  useEffect(() => {
    galleriesAction.getGalleries(dispatch);

    let keywords = query.get('keywords');
    if (!!keywords) {
      setKeywords(keywords);
      setFilter(keywords.toLocaleLowerCase());
    } else setFilter('');
  }, [dispatch, query]);

  const galleriesList = useMemo(() =>
    Object.keys(galleries)
      .map(id => galleries[id])
        .filter(gallery => {
          if (!filter) return true;
          return !!gallery.title.toLocaleLowerCase().match(filter.toLocaleLowerCase());
        }), [galleries, filter]);

  return (
    <div className="container primary min-vh-100">
      <WebsiteHeader pushContent={true} activeLink={HamburgerNavOptions.pastJams} />
      <div className="d-flex justify-content-between">
        <h2 className="mb-0">Browse Jams</h2>
        <div>
          { !!activeJam &&
            <Link to={`/active-jam`} className="btn btn-secondary btn-block">Active Jam</Link>
          }
          { adminStatus &&
            <Link to={`/jam/create`} className="btn btn-secondary btn-block ms-2">Create Jam</Link>
          }
        </div>
      </div>
      <div className="input-group my-2">
        <input type="text" id="searchbar" className="form-control" placeholder="Search..."
          value={keywords}
          onChange={updateKeywords}/>
        <button className="btn btn-outline-secondary" type="button" id="searchButton"
          onClick={handleSearch}>Search</button>
      </div>
      <div className="card text-secondary">
        <div className="list-group list-group-flush mb-0">
          <div className="list-group-item d-sm-flex d-none text-secondary h5 mb-0 user-select-none">
            <span className="col-lg-1 col-md-2 col-1"></span>
            <span className="col-lg-5 col-md-3 col-2"
              onClick={setSortByTitle}>
              Title { sortBy.key === 'sortByTitle' &&
                <i className={`fas fa-caret-${sortBy.sortByTitle === 'ASC' ? 'up':'down'}`}></i>
              }
            </span>
            <span className="col-lg-2 col-3 text-end"
              onClick={setSortBySubmissions}>
              { sortBy.key === 'sortBySubmissions' &&
                <i className={`fas fa-caret-${sortBy.sortBySubmissions === 'ASC' ? 'up':'down'}`}></i>
              } Submissions</span>
            <span className="col-md-2 col-3 text-end">Start</span>
            <span className="col-md-2 col-3 text-end"
              onClick={setSortByDate}>
              { sortBy.key === 'sortByDate' &&
                <i className={`fas fa-caret-${sortBy.sortByDate === 'ASC' ? 'up':'down'}`}></i>
              } End</span>
          </div>
          <div className="list-group-item d-flex d-sm-none text-secondary">
            <span className="col-md-1 col-sm-1 col-1"></span>
            <span className="col-lg-5 col-md-3 col-2"
              onClick={setSortByTitle}>Title
              { sortBy.key === 'sortByTitle' &&
                <i className={`fas fa-caret-${sortBy.sortByTitle === 'ASC' ? 'up':'down'}`}></i>
              }
            </span>
            <span className="col-lg-2 col-3 text-end">Submissions</span>
            <span className="col-md-2 col-3 text-end">Start</span>
            <span className="col-md-2 col-3 text-end"
              onClick={setSortByDate}>
              { sortBy.key === 'sortByDate' &&
                <i className={`fas fa-caret-${sortBy.sortByDate === 'ASC' ? 'up':'down'}`}></i>
              } End</span>
          </div>
          {
            galleriesList
              .sort(sortFns[sortBy.key][sortBy[sortBy.key]])
              .map(gallery => 
                <Link key={gallery.id} to={`/jam/${gallery.id}`} className="list-group-item d-flex link-secondary position-relative">
                  <span className="col-lg-1 col-md-2 col-1">
                    <img src={gallery.logo} alt="gallery logo" height="64" className="d-md-block d-none"/>
                    <img src={gallery.logo} alt="gallery logo" width="32" className="d-md-none d-block"/>
                  </span>
                  <span className="col-lg-5 col-md-4 col-3 position-relative">
                    <span className="position-absolute top-50 translate-middle-y">{gallery.title}</span>
                  </span>
                  <span className="col-lg-2 col-2 position-relative">
                    <span className="position-absolute top-50 end-0 translate-middle-y">{gallery.submissionCount}</span>
                  </span>
                  <span className="col-md-2 col-3 position-relative">
                    <span className="position-absolute top-50 end-0 translate-middle-y">{formatDate(gallery.submissionOpenDate)}</span>
                  </span>
                  <span className="col-md-2 col-3 position-relative">
                    <span className="position-absolute top-50 end-0 translate-middle-y">{formatDate(gallery.submissionCloseDate)}</span>
                  </span>
                </Link>
              )
          }
        </div>
      </div>
    </div>
  );
};

export default BrowseGalleries;