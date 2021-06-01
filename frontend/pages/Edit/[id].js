import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Hedder from "../../component/Hedder";
import { MDBSpinner } from "mdb-react-ui-kit";
export default function Edit() {
  const [data_default, setdata_default] = useState([]);
  const [pdf, setpdf] = useState(false);
  const [loging, setloging] = useState(false);
  const [dpfile, setdpfile] = useState(false);
  const [updateStatus, setupdateStatus] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const url = "http://localhost:5000/user/" + router.query.id;
    axios.get(url).then((response) => {
      setdata_default(response.data);
    });
  }, [router.query.id]);
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  useEffect(() => {
    setTimeout(function () {
      setupdateStatus(false);
    }, 20000);
  }, [updateStatus]);
  const onSubmit = async (event) => {
    setloging(true);
    event.preventDefault();
    let dp_data_url;
    let pdf_data_url;
    event.preventDefault();
    if (dpfile) {
      dp_data_url = await toBase64(dpfile);
    }

    if (pdf) {
      pdf_data_url = await toBase64(pdf);
    }
    const { name, email, gender, address, number } = event.target;

    const data = {
      id: router.query.id,
      name: name.value,
      email: email.value,
      gender: gender.value,
      number: number.value,
      address: address.value,
      image: dp_data_url ? dp_data_url : data_default[0].image,
      pdf: pdf_data_url ? dp_data_url : data_default[0].pdf,
    };
    console.log(data);
    const url = "http://localhost:5000/user/";

    axios
      .put(url, data)
      .then((response) => {
        setupdateStatus(response.data);
        console.log(response.data);
        setloging(false)
        router.push("/")
      })
      .catch((error) => {
        setupdateStatus(error.response.data);
        console.log(error.response);
        setloging(false)
      });
  };
  return (
    <>
      <Hedder />
      <div className="container pt-5 pb-5">
        {updateStatus && (
          <>
            {updateStatus.susses ? (
              <div className="alert alert-success" role="alert">
                {updateStatus.res}
              </div>
            ) : (
              <div className="alert alert-danger" role="alert">
                {updateStatus.res}
              </div>
            )}
          </>
        )}
        <form
          className="row g-3 needs-validation"
          method="POST"
          action="/adduser"
          noValidate
          onSubmit={onSubmit}
        >
          <div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  defaultValue={data_default[0]?.name}
                  placeholder="Full Name"
                  name="name"
                />
                <label htmlFor="floatingInput">Full Name</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  defaultValue={data_default[0]?.email}
                  placeholder="email@email.com"
                  name="email"
                />
                <label htmlFor="floatingInput">Email</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  defaultValue={data_default[0]?.gender}
                  placeholder="Mail or Female"
                  name="gender"
                />
                <label htmlFor="floatingInput">Mail or Female</label>
              </div>
            </div>
            <div className="col-6">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  defaultValue={data_default[0]?.number}
                  placeholder="Phone"
                  name="number"
                />
                <label htmlFor="floatingInput">Phone</label>
              </div>
            </div>
            <div className="custom-file col-6">
              <label className="custom-file-label" htmlFor="customFileLang">
                Profile Pictures
              </label>
              <input
                type="file"
                accept="image/*"
                className="form-control form-floating custom-file-input mb-3"
                id="customFileLang"
                lang="es"
                onChange={(event) => setdpfile(event.target.files[0])}
              />
            </div>
            <div className="custom-file col-6">
              <label className="custom-file-label" htmlFor="pdf">
                Resume PDF
              </label>
              <input
                type="file"
                accept="application/pdf"
                className="form-control form-floating custom-file-input mb-3"
                id="pdf"
                lang="es"
                onChange={(event) => setpdf(event.target.files[0])}
              />
            </div>
            <div className="col-12">
              <div className="form-floating mb-3">
                <textarea
                  className="form-control"
                  placeholder="Address"
                  id="address"
                  name="address"
                  style={{ height: 200 }}
                  defaultValue={data_default[0]?.address}
                />
                <label htmlFor="address">Address</label>
              </div>
            </div>

            <div className="col-12 d-grid">
              <button className="btn btn-primary" type="submit">
                {loging && (
                  <MDBSpinner
                    size="sm"
                    role="status"
                    tag="span"
                    className="me-2"
                  />
                )}
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
