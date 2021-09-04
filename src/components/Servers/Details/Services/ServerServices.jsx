import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleFetch } from '../../../Fetch/store';
import { Spinner } from '../../../Spinner/Spinner';
import { Error } from '../../../Error/Errors';
import './style.css';
import { Sidebar } from '../../../Sidebar/Sidebar';
import Item from './Item/item';
import { getSearch } from '../../../../Constants/Constants';

export const ServerServices = (props) => {
  const [services, setServices] = useState([]);
  const [servicesErr, setServicesErr] = useState('');
  const [isServicesLoading, setServicesLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [servicesSearch, setServicesSearch] = useState([]);

  useEffect(() => {
    setServicesLoading(true);
    handleFetch('GET', `/servers/${props.match.params.hv}/${props.match.params.name}/services`).then(({ data, err }) => {
      setServicesLoading(false);
      if (err) {
        setServicesErr(err);
      } else {
        setServices(data);
      }
    });

    return null;
  }, [props.match.params.hv, props.match.params.name]);

  const onSearch = (e) => {
    const { value } = e.target;
    if (value) {
      setSearch(true);
      setServicesSearch(getSearch(services, value));
    } else {
      setSearch(false);
    }
  };

  let servicesList = [];

  if (!isSearch) {
    servicesList = services.map((s) => (
      <Item
        key={s.name}
        service={s}
        params={props.match.params}
      />
    ));
  } else {
    servicesList = servicesSearch.map((s) => (
      <Item
        key={s.name}
        service={s}
        params={props.match.params}
      />
    ));
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="header-details">
          <Link to="/servers/" className="btn btn-back">
            <FontAwesomeIcon icon="arrow-left" />
          </Link>
          <div className="header-details__h">
            {props.match.params.name}
          </div>
          <div className="header-details__links">
            <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/info`} className="btn">
              Инфо
            </Link>
            <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/services`} className="btn bg-gold text-dark">
              Службы
            </Link>
            <Link to={`/servers/${props.match.params.hv}/${props.match.params.name}/processes`} className="btn">
              Процессы
            </Link>
          </div>
          <div className="header-details__search">
            <input
              type="search"
              className="w-100"
              placeholder="Search..."
              onChange={onSearch}
            />
          </div>
        </div>
        <div className="content">
          <div className="sc-items-header">
            <div className="sc-i-name">Name</div>
            <div className="sc-i-display-name">Display name</div>
            <div className="sc-i-state">State</div>
            <div className="sc-i-user">User</div>
            <div className="sc-i-actions">Actions</div>
          </div>
          <div className="sc-items">
            {servicesErr ? <Error text={servicesErr} /> : (isServicesLoading ? <Spinner text="Loading services..." /> : <div className="sc-items">{servicesList}</div>)}
          </div>
        </div>
      </div>
    </>
  );
};
