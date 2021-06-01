import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
export default function Table({ user, setUser }) {
  const [reslt, setreslt] = useState(false);
  const router = useRouter();
  const DeleteUser = ({ event, uid }) => {
    event.preventDefault();
    const url = "http://localhost:5000/user" + uid;
    axios
      .delete(url)
      .then((response) => setreslt(response.data))
      .catch((error) => setreslt(error.response.data));
    axios.get("http://localhost:5000/user").then((response) => {
      setUser(response.data);
    });
  };
  useEffect(() => {
    axios.get("http://localhost:5000/user").then((response) => {
      setUser(response.data);

    });
  }, []);
  useEffect(() => {
    setTimeout(function () {
      setreslt(false);
    }, 10000);
  }, [reslt]);

  return (
    <div className="container pt-3">
      {reslt && (
        <>
          {reslt.susses ? (
            <div className="alert alert-success" role="alert">
              {reslt.res}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              {reslt.res}
            </div>
          )}
        </>
      )}
      <div className="row">
        <div className="col-6">
          <h1>Users</h1>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <a
            href="/adduser"
            type="button"
            className="btn btn-primary align-self-center"
          >
            + add user
          </a>
        </div>
      </div>
      <table className="table table-bordered mt-5">
        <thead className="thead-dark">
          <tr>
            <th scope="col" className="text-center">
              User ID
            </th>
            <th scope="col" className="text-center">
              Name
            </th>
            <th scope="col" className="text-center">
              Profile Profile
            </th>
            <th scope="col" className="text-center">
              Resume PDF
            </th>
            <th scope="col" className="text-center">
              Email
            </th>
            <th scope="col" className="text-center">
              Gender
            </th>
            <th scope="col" className="text-center">
              Phone
            </th>
            <th scope="col" className="text-center">
              Address
            </th>
            <th scope="col" className="text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {user.map((data, index) => {
            return (
              <tr key={index} >
                <td  scope="row">{index+1}</td>
                <td >{data.name}</td>
                <td  >
                  <Image
                    src={data?.image}
                    alt="image"
                    className="img-fluid img-thumbnail "
                    width={200}
                    height={200}
                    objectFit="contain"
                  />
                </td>
                <td   className="img-fluid img-thumbnail " >
                  <embed   src={data.pdf} />
                </td>
                <td>{data.email}</td>
                <td>{data.gender}</td>
                <td>{data.number}</td>
                <td>{data.address}</td>
                <td className="text-center">
                  <button
                    type="button"
                    className="btn btn-light btn-small"
                    onClick={() => router.push("/Edit/" + data.id)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-light btn-small"
                    onClick={(event) =>
                      DeleteUser({ event, uid: "/" + data.id })
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
