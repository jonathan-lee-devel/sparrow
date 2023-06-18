# shellcheck disable=SC2046
source .env.ui && cd ../../ && git pull && docker compose -f services/ui/docker-compose.yml down -v && docker rmi $(docker images -q) && docker compose -f services/ui/docker-compose.yml up -d
