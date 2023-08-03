//next
import Image from "next/image";
import Link from "next/link";
//react
import { Dispatch, FC, SetStateAction } from "react";
//constants
import { sidebarNav } from "../../constants";
//next-intl
import { useTranslations } from "next-intl";
//material ui
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
//sass
import styles from "./index.module.sass";
//redux
import { useTypedDispatch, useTypedSelector } from "../../redux/store";
import { changeNavActiveBtn } from "../../redux/slices/system";

type SidebarPropsType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export const Sidebar: FC<SidebarPropsType> = ({ setIsOpen, isOpen }) => {
  const t = useTranslations();
  const dispatch = useTypedDispatch();
  const { navActiveBtn } = useTypedSelector((state) => ({
    navActiveBtn: state.system.navActiveBtn,
  }));

<<<<<<< HEAD
  return (
    <nav className={`${styles.sidebar} ${isOpen && styles.active}`}>
      <div className={styles.sidebar__close}>
        <IconButton
          className={styles.sidebar__close__btn}
          onClick={() => setIsOpen(false)}
        >
          <CloseIcon className={styles.sidebar__close__icon} />
        </IconButton>
      </div>
      <div className={styles.sidebar__logo}>
        <Image src="/img/logo.svg" width={110} height={90} />
      </div>
      {sidebarNav.map((nav) => {
        return (
          <Link key={nav.name} href={nav.path}>
            <a
              className={`${styles.sidebar__link} ${
                navActiveBtn === nav.name && styles.sidebar__link_active
              }`}
              onClick={() => {
                dispatch(
                  changeNavActiveBtn({
                    navActiveBtn: nav.name,
                  })
                );
              }}
            >
              <div className={styles.sidebar__link__icon}>
                <Image width={23} height={23} alt={nav.name} src={nav.image} />
              </div>
              {t(`sidebar.${nav.name}`)}
            </a>
          </Link>
        );
      })}
    </nav>
  );
};
=======
    return (
        <nav className={`${styles.sidebar} ${isOpen && styles.active}`}>
            <div className={styles.sidebar__close}>
                <IconButton className={styles.sidebar__close__btn} onClick={() => setIsOpen(false)}>
                    <CloseIcon className={styles.sidebar__close__icon} />
                </IconButton>
            </div>
            <div className={styles.sidebar__logo}>
                <Image 
                    alt={"logo"}
                    width={130}
                    height={50}
                    src={"/icons/logo-white.svg"}
                />
            </div>
            {
                sidebarNav.map((nav) => {
                    return (
                        <Link
                            key={nav.name}
                            href={nav.path}
                        >
                            <a
                                className={`${styles.sidebar__link} ${navActiveBtn === nav.name && styles.sidebar__link_active
                                    }`}
                                onClick={() => {
                                    dispatch(changeNavActiveBtn({
                                        navActiveBtn: nav.name
                                    }))
                                }}
                            >
                                <div className={styles.sidebar__link__icon}>
                                    <Image
                                        width={23}
                                        height={23}
                                        alt={nav.name}
                                        src={nav.image}
                                    />
                                </div>
                                {t(`sidebar.${nav.name}`)}
                            </a>
                        </Link>
                    )
                })
            }
        </nav>
    )
};
>>>>>>> bb1b10db17d93a9af130243f07165de6610bdcd4
