#include <eosiolib/eosio.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/asset.hpp>

using namespace eosio;

CONTRACT assigntokens : public eosio::contract {

public:

  assigntokens(name receiver, name code, datastream<const char*> ds) : contract(receiver, code, ds) {}

  ACTION login(name user){
    require_auth(user);

    reward_index rewards(_code, _code.value);
    auto itr = rewards.find(user.value);

    if(itr == rewards.end()){
      rewards.emplace(user, [&](auto& row){
        row.account = user;
        row.last_reward_time = now();
      });
      issue_token(user, asset{500000, symbol("FXT", 4)});
    }else{
      auto data = rewards.get(user.value);
      if(!is_today(data.last_reward_time)){
        rewards.modify(itr, user, [&](auto& row){
          row.last_reward_time = now(); 
        }); 
        issue_token(user, asset{500000, symbol("FXT", 4)});
      }
    }
  }

private:

  bool is_today(uint64_t last_time){
    return now() / 86400 == last_time / 86400;
  }

  void issue_token(name to, asset quantity){
    action(
      permission_level{get_self(),"active"_n},
      "eosio.token"_n,
      "issue"_n,
      std::make_tuple(to, quantity, std::string(""))
    ).send();
  }

  TABLE reward {
    name account; 
    uint64_t last_reward_time; 

    uint64_t primary_key() const { return account.value;}
  };

  typedef eosio::multi_index<"reward"_n, reward> reward_index;
};

EOSIO_DISPATCH(assigntokens, (login))