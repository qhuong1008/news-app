import styles from "../styles/EOM.module.css";
import cat from "../../public/cat.png";
import Image from "next/image";
import catImg from "../../public/cat.png";
import Toolbar from "@/components/toolbar";

function EOM({ employee }) {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee of the month</h1>
      </div>
      <div className={styles.employeeOfTheMonth}>
        <h3>{employee.name}</h3>
        <h5>{employee.position}</h5>
        <Image src={employee.image} width={150} height={150} />
        <p>{employee.description}</p>
      </div>
    </div>
  );
}
export const getStaticProps = async (pageContext) => {
  const employee = {
    name: "Pham Quynh Huong",
    position: "Software Developer",
    image: catImg,
    description: "Employee Of The Month",
  };
  return {
    props: {
      employee,
    },
  };
};

export default EOM;
