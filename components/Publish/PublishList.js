import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { PublishContext } from "../../context/PublishContext";

function PublishList({ handleItemClick }) {
  const [pusblishData, setPusblishData] = useState({});
  const { data, error, isLoading } = useContext(PublishContext).contextValue;

  return error.message ? (
    "network error"
  ) : (
    <>
      {data?.map((item, i) => (
        <a
          className="PublistList mb-1"
          href="#"
          key={item.id}
          style={{ textDecoration: "none" }}
          onClick={(e) => handleItemClick(e, i)}
        >
          <div className="PublishItem d-flex align-items-center justify-content-between py-3 mb-2 pl-3 border shadow-sm rounded">
            <div className="d-flex align-items-center">
              {!item.picture ? (
                <Image src="/user.svg" alt="logo" height={50} width={50} />
              ) : (
                <img
                  src={item.picture}
                  alt="logo"
                  height={50}
                  width={50}
                  className="rounded-circle"
                />
              )}

              <div className="pl-3">
                <h6 className="m-0 text-capitalize text-dark">{item.name}</h6>
                <small className="text-muted">{item.email}</small>
              </div>
            </div>
            <Image src="/arr-right.svg" alt="view" height={30} width={30} />
          </div>
        </a>
      ))}
    </>
  );
}

export default PublishList;