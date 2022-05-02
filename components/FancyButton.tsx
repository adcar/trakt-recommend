import styles from "../styles/FancyButton.module.scss";


export default function FancyButton({link, message}: IProps) {
  return (
    <a href={link} className={styles.fancyButton}>{message}</a>
  )
}

interface IProps {
  link: string;
  message: string;
}

