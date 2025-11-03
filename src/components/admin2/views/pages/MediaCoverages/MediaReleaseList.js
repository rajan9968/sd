import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import "../../../../admin2/scss/style.scss";
import "../../../../admin2/scss/examples.scss";
import "../../../../admin2/scss/custom.css";
import DataTable from "react-data-table-component";
import { CBreadcrumb, CBreadcrumbItem, CButton } from "@coreui/react";
import { Link } from "react-router-dom";
import { cilPlus, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import api from "../../../../../api/axiosInstance";
import API_PATH from "../../../../../api/apiPath";

export default function PressReleaseList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this press release?")) {
            api
                .delete(`/media-releases/delete-media-release/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success("Press release deleted successfully");
                        setData((prev) => prev.filter((item) => item.id !== id));
                    } else {
                        toast.error(response.data.message || "Failed to delete press release");
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Something went wrong!");
                });
        }
    };

    // Table columns
    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            sortable: true,
            width: "80px",
        },
        {
            name: "Heading",
            selector: (row) => row.press_release_heading || "—",
            sortable: true,
        },
        {
            name: "Publication",
            selector: (row) => row.press_release_publication || "—",
            sortable: true,
        },
        {
            name: "Date",
            selector: (row) =>
                row.press_release_date
                    ? new Date(row.press_release_date).toLocaleDateString()
                    : "—",
            sortable: true,
            width: "150px",
        },
        {
            name: "Picture",
            cell: (row) =>
                row.press_release_picture ? (
                    <img
                        src={`${API_PATH}/uploads/press-releases/${row.press_release_picture}`}
                        alt="Press Release"
                        style={{
                            width: "70px",
                            height: "50px",
                            objectFit: "cover",
                            borderRadius: "5px",
                        }}
                    />
                ) : (
                    <span>No Image</span>
                ),
            width: "130px",
        },
        {
            name: "Actions",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link to="/admin/edit-media-release" state={{ id: row.id }}>
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
            width: "150px",
        },
    ];

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/media-releases/get-media-releases");
                if (response.data.success && Array.isArray(response.data.pressReleases)) {
                    setData(response.data.pressReleases);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }

            } catch (error) {
                console.error("Error fetching press releases:", error);
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
                                    / Media Coverages
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Header + Add Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6 d-flex align-items-center">
                            <h5 className="mx-3 mb-0">Media Coverages</h5>
                        </div>
                        <div className="col-lg- 6 d-flex justify-content-end">
                            <Link to="/admin/add-media-release" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Media Coverage
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Data Table */}
                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={loading}
                        highlightOnHover
                        striped
                        dense
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
