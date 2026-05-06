import { NavLink } from "react-router-dom";
import styled from "styled-components";
export const CustomNavLink = styled(NavLink)`
  text-decoration: none;
  color: #868686;
  padding: 5px 10px;
  border-radius: 5px;
  transition: color 0.3s ease;
  &:hover {
    color: #099e8e; // Change color on hover
  }
  &.active {
    color: #099e8e; // Change color when active
  }
`;
