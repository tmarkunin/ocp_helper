export master_host = $(oc get nodes | grep master | head -n 1 | awk '{print $1}')

ssh -i ~/.ssh/id_rsa core@$master_host 'sudo -E mount 10.1.2.4:/nfs/cluster-backup/ /mnt'
ssh -i ~/.ssh/id_rsa core@$master_host 'sudo -E /usr/local/bin/cluster-backup.sh /mnt'
ssh -i ~/.ssh/id_rsa core@$master_host 'sudo -E umount /mnt'
