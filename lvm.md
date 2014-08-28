# Setup

Give root reasonable disk space, 100G was default on ByteMark server

### Creating logical volumes (`vgdisplay` to see volume groups)
```
lvcreate --name cpan --size 45G vg-hdds
lvcreate --name elasticsearch --size 83G vg-hdds
lvcreate --name metacpan-tmp --size 158G vg-hdds
```

#### Create metacpan-tmp filesystem (need LOTS of inodes)
```
mkfs.ext4 -i 4096 /dev/mapper/vg--hdds-metacpan--tmp
```

#### Check number of inodes = block clount
```
tune2fs -l /dev/mapper/vg--hdds-metacpan--tmp
Inode count:              41418752
Block count:              41418752
```

#### Then file systems for the rest
```
mkfs.ext4 /dev/mapper/vg--hdds-cpan
mkfs.ext4 /dev/mapper/vg--hdds-elasticsearch
```

#### Somewhere to mount
```
mkdir /mnt/lv-metacpan--tmp
mkdir /mnt/lv-cpan
mkdir /mnt/lv-elasticsearch
```

#### Edit /etc/fstab and add
```
/dev/mapper/vg--hdds-cpan         	  /mnt/lv-cpan ext4 defaults 0 2
/dev/mapper/vg--hdds-elasticsearch    /mnt/lv-elasticsearch ext4 defaults 0 2
/dev/mapper/vg--hdds-metacpan--tmp    /mnt/lv-metacpan--tmp   ext4 defaults 0 2
```
