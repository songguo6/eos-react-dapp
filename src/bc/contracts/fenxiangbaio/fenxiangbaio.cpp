#include <eosiolib/eosio.hpp>

using namespace eosio;

class [[eosio::contract("fenxiangbaio")]] fenxiangbaio : public eosio::contract {

public:
  
  fenxiangbaio(name receiver, name code, datastream<const char*> ds) : contract(receiver, code, ds) {}

  [[eosio::action]]
  void create(name user, std::string title, std::string summary, uint64_t timestamp,
    uint64_t category, std::string cover, std::string content, std::string contentj){

    require_auth(user);

    article_index articles(_code, _code.value);

    articles.emplace(user, [&](auto& row){
      row.id = articles.available_primary_key();
      row.author = user.to_string();
      row.title = title;
      row.summary = summary;
      row.timestamp = timestamp;
      row.category = category;
      row.cover = cover;
      row.content = content;
      row.contentj = contentj;
      row.likenum = 0;
    });
  }

  [[eosio::action]]
  void update(name user, uint64_t id, std::string title, std::string summary, 
    std::string cover, std::string content, std::string contentj){

    require_auth(user);   

    article_index articles(_code, _code.value);

    auto itr = articles.find(id);
    eosio_assert(itr != articles.end(), "Record does not exist");
    auto data = articles.get(id);
    eosio_assert(data.author == user.to_string(), "Can not modify other's data");

    articles.modify(itr, user, [&](auto& row){
      row.title = title;
      row.summary = summary;
      row.cover = cover;
      row.content = content;
      row.contentj = contentj;  
    }); 
  }

  [[eosio::action]]
  void remove(name user, uint64_t id){
    require_auth(user);

    article_index articles(_self, _code.value);

    auto data = articles.get(id);
    eosio_assert(data.author == user.to_string() , "Can not remove other's data");

    auto itr = articles.find(id);
    eosio_assert(itr != articles.end(), "Record does not exist");
    articles.erase(itr);
  }

  [[eosio::action]]
  void like(name user, uint64_t id){
    require_auth(user);

    article_index articles(_code, _code.value);

    auto itr = articles.find(id);
    eosio_assert(itr != articles.end(), "Record does not exist");
    auto data = articles.get(id);
    eosio_assert(data.author == user.to_string(), "Can not modify other's data");

    articles.modify(itr, user, [&](auto& row){
      row.likenum++;
    });    
  }

private:

  struct [[eosio::table]] article {
    uint64_t id;
    std::string author;
    std::string title;
    std::string summary;
    uint64_t timestamp;
    uint64_t category;
    std::string cover;
    std::string content;
    std::string contentj;
    uint64_t likenum;

    uint64_t primary_key() const {return id;}
  };

  typedef eosio::multi_index<"article"_n, article > article_index;
};

EOSIO_DISPATCH(fenxiangbaio, (create)(update)(remove)(like))