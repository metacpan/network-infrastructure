# MetaCPAN NOC Servers

## Physical servers

### Bytemark

Name | RAM | CPU | Disk
-----|-----|-----|-----
bm-mc-02 | 32GB | 8 core AMD Opteron(tm) Processor 3380 | 1TB SATA, 250 SSD
bm-mc-03 | 32GB | 4 core Intel(R) Xeon(R) CPU E5504  @ 2.00GHz | 542 GB
bm-mc-04 | 32GB | 8 core AMD Opteron(tm) Processor 3380 | 1TB SATA, 250 SSD

### Liquid Web

Name | RAM | CPU | Disk
-----|-----|-----|-----
lw-mc-01 | 32GB | 16 core Intel(R) Xeon(R) CPU E5520  @ 2.27GHz | 465 GB
lw-mc-02 | 32GB | 16 core Intel(R) Xeon(R) CPU E5520  @ 2.27GHz | 833 GB
lw-mc-03 | 32GB | 16 core Intel(R) Xeon(R) CPU E5520  @ 2.27GHz | 833 GB

See [domains](https://github.com/CPAN-API/network-infrastructure/blob/master/domains.md) for what
is hosted where.

## Hard disks (lvm)


### How to format filesystem for metacpan.org/tmp folder

That folder contains the unpacked tarballs and as such consists of millions of small files. We will run out of inodes faster than disk space. When formatting that filesystem, ensure that inode-size = block-size:

    mkfs.ext4 -i 4096 /dev/mapper/$lv # assuming block size of that volume is 4k

### How to increase storage space for Elasticsearch and the CPAN mirror?

The CPAN mirror and the Elasticsearch data are stored in `/var/cpan` and `/var/elasticsearch`, respectively. Those are filesystems on top of the LVM LVs `/dev/mapper/vg0-cpan` and `/dev/mapper/vg0-elasticsearch`.

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

### Need to clean out /var/tmp/metacpan/ ?

`````
find /var/tmp/metacpan/source/ -maxdepth 2 -type d -mtime +215 | head -5000 | xargs sudo rm -rf
`````
This doesn't solve it as such - but cleans up files that haven't been modified/extracted in a long while

## Setting up logical volumes

See our [LVM documentation](./lvm.md).

## Setting up a box

 * [lvm disk configuration](lvm.md)

 * [Setting up puppet on a new box](./puppet.md)

 * [Installing SSL certs on a new box](https://github.com/CPAN-API/metacpan-conf-private) * external
