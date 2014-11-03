# Puppet


### Install puppet
#### (need gem deep_merge for hiera_hash merging)
```
sudo su -
apt-get install -y git
wget http://apt.puppetlabs.com/puppetlabs-release-wheezy.deb
dpkg -i puppetlabs-release-wheezy.deb
apt-get update
apt-get install -y puppet
gem install deep_merge
```

### Clone repo
```
cd /etc
mv puppet dpkg.puppet
git clone https://github.com/CPAN-API/metacpan-puppet.git ./puppet
```

### Run puppet
```
sudo sh /etc/puppet/run.sh
```

### For production machines (as a metacpan admin) see:

https://github.com/CPAN-API/metacpan-conf-private


