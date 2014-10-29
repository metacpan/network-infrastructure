
### How to format filesystem for metacpan.org/tmp folder

That folder contains the unpacked tarballs and as such consists of millions of small files. We will run faster out of inodes than disk space. When formatting that filesystem, ensure that inode-size = block-size:

    mkfs.ext4 -i 4096 /dev/mapper/$lv # assuming block size of that volume is 4k

### How to increase storage space for ElasticSearch and the CPAN mirror?

The CPAN mirror and the ElasticSearch data are stored in `/var/cpan` and `/var/elasticsearch`, respectively. Those are filesystems on top of the LVM LVs `/dev/mapper/vg0-cpan` and `/dev/mapper/vg0-elasticsearch`.

To increase the space available on one of them, change the following example, which adds an additional 100 MB for the CPAN mirror. There's no need to unmount anything.

````
# Show current usage (and what is free, see note below)
pvscan
# Grow the LVM volume
lvextend -L +100M /dev/mapper/vg0-cpan
# Extend the filesystem to the fit the new LV size
resize2fs /dev/mapper/vg0-cpan
````

Do **NOT** allocate all the unused space to logical volumes. We need some free space to use by LVM snapshots during the backup process. We haven't actually checked how much spare space we need for that, so let's play it safe and say that *at least* 1.5 GiB should be left alone.

## Need to clean out /var/tmp/metacpan/ ?

`````
find /var/tmp/metacpan/source/ -maxdepth 2 -type d -mtime +215 | head -5000 | xargs sudo rm -rf
`````
This doesn't solve it as such - but cleans up files that haven't been modified/extracted in a long while
