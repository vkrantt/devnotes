import React from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/config";
import { BiEdit, BiTrashAlt } from "react-icons/bi";

const SoicalCard = ({ note, handleDelete, isDeleteLoading }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleEdit = (note) => {
    navigate({
      pathname: "/create",
      search: `?id=${note._id}`,
    });
  };

  return (
    <Card className="border-0 border-bottom border-blue border-3 rounded-0 mb-3">
      <Card.Body className="p-0">
        <div className="blockquote mb-0">
          <NavLink to={`detail/${note._id}`} className="socialTitle">
            {note?.title}
          </NavLink>
          <footer className="fs-6 text-muted">
            <div className="d-flex justify-content-between align-items-center">
              <div>{note?.createdBy?.username}</div>
              <h6 className="text-muted">
                Updated on {formatDate(note?.updatedAt)}
              </h6>
            </div>
          </footer>
        </div>
      </Card.Body>
      {pathname === "/my-wall" && (
        <div className="d-flex align-items-center mb-2">
          <Button
            variant="outline-dark"
            size="sm"
            className="btn p-0 me-2"
            onClick={() => handleEdit(note)}
          >
            <div className="d-flex align-items-center border-blue px-2 py-1">
              <BiEdit /> EDIT
            </div>
          </Button>
          <Button
            variant="outline-dark"
            size="sm"
            className="btn p-0 me-2"
            onClick={() => handleDelete(note)}
          >
            <div className="d-flex align-items-center border-blue px-2 py-1">
              <BiTrashAlt /> DELETE
            </div>
          </Button>
        </div>
      )}
    </Card>
  );
};

export default SoicalCard;
