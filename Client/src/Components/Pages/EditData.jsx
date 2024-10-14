import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditData = () => {
    const { id } = useParams();
    const [userData, setUserData] = useState(null);
    const [userUpdate, setUserUpdate] = useState({
        name: "",
        email: "",
        phone: ""
    });

    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:3000/user/getId/${id}`
        }).then((res) => {
            console.log('API Response:', res.data);
            setUserData(res.data);
            setUserUpdate({
                name: res.data._doc.name,
                email: res.data._doc.email,
                phone: res.data._doc.phone
            });
        }).catch((err) => {
            console.error(err);
        });
    }, [id]);

    const inputHandle = (e) => {
        setUserUpdate({ ...userUpdate, [e.target.name]: e.target.value });
    }

    const formSubmit = (e) => {
        e.preventDefault();
        axios({
            method: "PUT",
            url: `http://localhost:3000/user/updateData/${id}`,
            data: userUpdate,
            headers: {
                'Content-Type': "application/json"
            }
        }).then((res) => {
            alert(res.data.message);
        }).catch((err) => {
            alert(err.response.data.errMessage);
        });
    }


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="my-2 rounded bg-primary">
                        <div className="h2 text-center py-2 text-white">Update Data</div>
                    </div>
                </div>
            </div>

            {userData ? (
                <form onSubmit={formSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Name" className="form-label">Name</label>
                        <input
                            type="text"
                            name="name"
                            onChange={inputHandle}
                            value={userUpdate.name}
                            className="form-control"
                            id="Name"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Email" className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            onChange={inputHandle}
                            value={userUpdate.email}
                            className="form-control"
                            id="Email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Phone" className="form-label">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            onChange={inputHandle}
                            value={userUpdate.phone}
                            className="form-control"
                            id="Phone"
                        />
                    </div>
                    <input type="submit" className="btn btn-primary" value="Update" />
                </form>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default EditData;
