import sys, json
from itertools import combinations, chain

def koppen_query_algorithm(items, P_yes, P_neg):
    Q = list(items)
    P = set()
    k = 1
    necessary_eq = 0
    antecedents = list(combinations(Q, k))
    #print("combinations(Q, k):")
    #print(antecedents)

    for A in antecedents:
        for q in Q:
            if q in A:
                P_yes.add((A, q))
                continue

            already_known = (A, q) in P or (A, q) in P_neg
            if already_known:
                continue

            if check_inferred(P):
                continue
            return A,q


def check_inferred(P):
    inferred = False
    for (A1, p1) in list(P):
        for (B1, q1) in list(P):
            set_A1 = set(A1)
            set_B1 = set(B1)

            # IR1: A ⊢ p, B ⊢ q, B = A ∪ {p}
            if set_B1 == set_A1.union({p1}) and (A1, p1) in P and (B1, q1) in P:
                if (tuple(set_B1), q1) not in P:
                    P.add((tuple(set_B1), q1))
                    inferred = True

                    # IR2: A ⊢ p, A ⊢ q, B = A ∪ {p}, B ⊢ q ist redundant
            elif set_B1 == set_A1.union({p1}) and (A1, p1) in P and (A1, q1) in P:
                continue

                # IR3: A ⊢ p, B ⊢ q, B ⊢ p, A = B ∪ {q}
            elif set_A1 == set_B1.union({q1}) and (A1, p1) in P and (B1, q1) in P and (B1, p1) in P:
                if (A1, q1) not in P:
                    P.add((A1, q1))
                    inferred = True

                    # IR4: A = B, A ⊢ p, B ⊢ q, B ∪ {q} ⊢ p ⇒ A ⊢ q
            elif set_A1 == set_B1 and (A1, p1) in P and (B1, q1) in P and ((tuple(set_B1.union({q1})), p1) in P):
                if (A1, q1) not in P:
                    P.add((A1, q1))
                    inferred = True
    return inferred

items = json.load(sys.stdin)
competence_items = items.get("competenceItems", [])
p_yes_list = items.get("pyes", [])
p_yes_set = set(p_yes_list)
p_no_list = items.get("pno", [])
p_no_set = set(p_no_list)
result = koppen_query_algorithm(competence_items, p_yes_set, p_no_set)
print(json.dumps(result))






