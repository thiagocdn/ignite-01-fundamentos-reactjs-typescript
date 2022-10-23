import styles from './avatar.module.css'

interface AvatarProps {
    src: string;
    hasBorder?: boolean;
    alt?: string;
}

export function Avatar({ hasBorder = true, ...props }: AvatarProps) {
    return (
        <img
            className={hasBorder ? styles.avatarWithBorder : styles.avatar}
            {...props}
        />
    );
}