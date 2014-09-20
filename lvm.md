# Setup

Give root reasonable disk space, 100G was default on ByteMark server

### Creating logical volumes (`vgdisplay` to see volume groups)
```
lvcreate --name cpan --size 55G vg-hdds
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

#### You probably want to sync from an existing machine
```
cd /mnt/lv-cpan
rsync -a -e "ssh -p 2202" leo@bm-n2.metacpan.org:/var/cpan/ ./
```

#### Extending space

To increase the space available on one of them, change the following example, which adds an additional 100 MB for the CPAN mirror. There's no need to unmount anything.

```
# Show current usage (and what is free, see note below)
pvscan
# Grow the LVM volume
lvextend -L +100M /dev/mapper/vg--hdds-cpan
# Extend the filesystem to the fit the new LV size
resize2fs /dev/mapper/vg--hdds-cpan
```

