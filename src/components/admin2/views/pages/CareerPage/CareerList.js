import React, { useEffect, useState } from "react";
import {
    AppContent,
    AppSidebar,
    AppFooter,
    AppHeader,
} from "../../../components/index";
import "../../../../admin2/scss/style.scss";
import "../../../../admin2/scss/examples.scss";
import "../../../../admin2/scss/custom.css";
import DataTable from "react-data-table-component";
import {
    CBreadcrumb,
    CBreadcrumbItem,
    CButton,
} from "@coreui/react";
import { Link } from "react-router-dom";
import { cilPlus, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import api from "../../../../../api/axiosInstance";
import API_PATH from "../../../../../api/apiPath";

export default function CareerList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🗑 Delete career entry
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this contact record?")) {
            api
                .delete(`/careers-data/delete-admin-career/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Contact entry deleted successfully');
                        // 🔁 Refresh the whole page after success
                        window.location.reload();
                    } else {
                        toast.error(response.data.message || 'Failed to delete record');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Something went wrong!');
                });
        }
    };
    // 📊 Table columns
    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px",
        },
        {
            name: "Banner Sub Heading",
            selector: (row) => row.banner_sub_heading || "—",
            sortable: true,
        },
        {
            name: "Banner Image",
            cell: (row) =>
                row.banner_image ? (
                    <img
                        src={`${API_PATH}/uploads/careers/${row.banner_image}`}
                        alt="Banner"
                        style={{
                            width: "70px",
                            height: "45px",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                    />
                ) : (
                    <span>No Image</span>
                ),
            width: "120px",
        },
        {
            name: "Why Join",
            cell: (row) => {
                const items = Array.isArray(row.why_join) ? row.why_join : [];
                return items.length > 0 ? (
                    <ul className="mb-0 ps-3">
                        {items.map((item, i) => (
                            <li key={i}>{item.heading || "—"}</li>
                        ))}
                    </ul>
                ) : (
                    "—"
                );
            },
            width: "200px",
        },
        {
            name: "Key Highlights",
            cell: (row) => {
                const items = Array.isArray(row.key_highlights) ? row.key_highlights : [];
                return items.length > 0 ? (
                    <ul className="mb-0 ps-3">
                        {items.map((item, i) => (
                            <li key={i}>
                                {item.number || "—"} – {item.text || "—"}
                            </li>
                        ))}
                    </ul>
                ) : (
                    "—"
                );
            },
            width: "250px",
        },
        {
            name: "Testimonials",
            cell: (row) => {
                const items = Array.isArray(row.employee_testimonials)
                    ? row.employee_testimonials
                    : [];
                return items.length > 0 ? (
                    <ul className="mb-0 ps-3">
                        {items.map((item, i) => (
                            <li key={i}>
                                {item.video ? (
                                    <a href={item.video} target="_blank" rel="noreferrer">
                                        Video {i + 1}
                                    </a>
                                ) : (
                                    "—"
                                )}
                            </li>
                        ))}
                    </ul>
                ) : (
                    "—"
                );
            },
            width: "180px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link to="/admin/edit-career-admin" state={{ id: row.id }}>
                        <CButton color="primary" variant="outline" size="sm">
                            <CIcon icon={cilPencil} />
                        </CButton>
                    </Link>
                    <CButton
                        color="danger"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        <CIcon icon={cilTrash} />
                    </CButton>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // 📥 Fetch career data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/careers-data/get-admin-careers");

                // ✅ Directly set data since API returns an array
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else if (Array.isArray(response.data.data)) {
                    // fallback in case backend changes later
                    setData(response.data.data);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching careers:", error);
                toast.error("Failed to load careers");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    {/* Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>
                                    / Careers
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Header with Add button */}
                    <div className="row mb-3">
                        <div className="col-lg-6 d-flex align-items-center">
                            <CBreadcrumb className="mx-3 mb-0">
                                <CBreadcrumbItem>Careers</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/add-career-admin" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Career
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* DataTable */}
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={loading}
                        highlightOnHover
                        striped
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
