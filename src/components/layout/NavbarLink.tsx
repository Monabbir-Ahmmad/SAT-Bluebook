import { Group, createStyles, getStylesRef } from "@mantine/core";

import { IconType } from "react-icons/lib";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const useStyles = createStyles((theme) => ({
  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({
          variant: "light",
          color: theme.primaryColor,
        }).color,
      },
    },
  },
}));

export default function NavbarLink({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: IconType;
}) {
  const { classes, cx } = useStyles();

  const activeSegment = useSelectedLayoutSegment();
  const targetSegment = href.split("/").pop();

  return (
    <Link
      href={href}
      className={cx(classes.link, {
        [classes.linkActive]: activeSegment === targetSegment,
      })}
    >
      <div className="flex gap-5 items-center">
        <Icon size={25} />
        <span className="ml-2">{label}</span>
      </div>
    </Link>
  );
}
