import axios from 'axios';
import React, { useState } from 'react';

const InsertData = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        image: "",
    });

    const inputHandle = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handelImage = (e) => {
        setFormData({ ...formData, image: e.target.files[0] })
    }
    console.log(formData)

    const formHandle = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", formData.name);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("image", formData.image)
        
        // for (let i = 0; i < formData.image.length; i++) {
        //     data.append("image", formData.image[i]);
        // }
        axios({
            method: 'POST',
            url: 'http://localhost:3000/user/insertUser',
            data: data,
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                console.log(res.data);
                alert('Data Successfully Inserted!');
            })
            .catch((err) => {
                console.error(err);
                alert('Data Not Inserted. Error: ' + err.message);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="my-2 rounded bg-primary">
                        <div className="h2 text-center py-2 text-white">Insert Data</div>
                    </div>
                </div>
            </div>

            <form onSubmit={formHandle} encType='multipart/form-data'>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input type="text" onChange={inputHandle} name="name" className="form-control" id="Name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="email" onChange={inputHandle} name="email" className="form-control" id="Email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Phone" className="form-label">Phone</label>
                    <input type="text" onChange={inputHandle} name="phone" className="form-control" id="Phone" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Image" className="form-label">Phone</label>
                    <input type="file" onChange={handelImage} name="image" className="form-control" id="Image" />
                </div>
                <input type="submit" className="btn btn-primary" value="Submit" />
            </form>
        </div>
    );
};

export default InsertData;
