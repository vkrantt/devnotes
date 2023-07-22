import React from "react";
import { Button, Card } from "react-bootstrap";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/config";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import Loader from "../spinner/Loader";

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
    <div>
      <Card className="border-0 border-bottom border-blue border-3 rounded-0">
        <Card.Body className="px-0">
          <blockquote className="blockquote mb-0">
            <p>
              <NavLink to={`detail/${note._id}`} className="socialTitle">
                {note?.title}
              </NavLink>
            </p>
            <footer className="blockquote-footer text-blue">
              John Doe experts in <cite title="Source Title">Engineering</cite>
            </footer>
            <h6 className="text-muted">
              Last updated on {formatDate(note.createdAt)}
            </h6>
          </blockquote>
        </Card.Body>
        {pathname === "/my-wall" && (
          <div className="d-flex align-items-center mb-2">
            <Button
              variant="none"
              className="btn p-0 border-0 shadow-none me-2"
              onClick={() => handleEdit(note)}
            >
              <div className="d-flex align-items-center border-blue px-2 py-1">
                <BiEdit /> EDIT
              </div>
            </Button>
            <Button
              variant="none"
              className="btn p-0 border-0 shadow-none me-2"
              onClick={() => handleDelete(note)}
            >
              <div className="d-flex align-items-center border-blue px-2 py-1">
                <BiTrashAlt />
                {isDeleteLoading ? <Loader /> : "DELETE"}
              </div>
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SoicalCard;
